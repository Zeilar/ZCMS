import { BigNavButton } from '../styled-components';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import HttpError from '../http/HttpError';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import Http from '../../classes/Http';
import { mdiLoading } from '@mdi/js';
import classnames from 'classnames';
import Threads from './Threads';
import Header from '../Header';
import Icon from '@mdi/react';
import Posts from './Posts';
import About from './About';
import Chat from './Chat';

export default function Profile() {
    const styles = createUseStyles({
        container: {
            margin: [0, 'var(--container-margin)'],
        },
        avatar: {
            width: 100,
        },
        loading: {
            color: 'var(--color-main)',
        },
        username: {
            fontFamily: 'Merriweather',
        },
        content: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            margin: [0, 'var(--container-margin)'],
            marginTop: 2,
        },
        tabs: {

        },
        tab: {
            padding: 10,
            margin: 10,
            '&.active': {

            },
        },
    });
    const classes = styles();

    const [activeTab, setActiveTab] = useState('about');
    const [httpError, setHttpError] = useState(false);
    const { id } = useParams();

    const { data, status } = useQuery(`user-${id}`, async () => {
        const response = await Http.get(`users/${id}`);
        if (response.code !== 200) setHttpError(response.code);
        return response.data;
    });

    if (httpError) return <HttpError code={httpError} />

    const render = () => {
        if (status === 'loading') {
            return <Icon className={classnames(classes.loading, 'loadingWheel-3 center-self')} path={mdiLoading} spin={1} />
        }
        return (
            <div className={classnames(classes.container, 'mt-5')}>
                <div className={classnames('col center-children')}>
                    <img className={classnames(classes.avatar, 'round')} src={`/storage/avatars/${data.avatar}`} alt="Profile avatar" />
                    <h1 className={classnames(classes.username, 'mt-3')}>{data.username}</h1>
                </div>
                <nav className={classnames(classes.tabs, 'center-children mt-3')}>
                    <BigNavButton className={classnames(classes.tab, { active: activeTab === 'about' })} onClick={() => setActiveTab('about')}>
                        About
                    </BigNavButton>
                    <BigNavButton className={classnames(classes.tab, { active: activeTab === 'threads' })} onClick={() => setActiveTab('threads')}>
                        Threads
                    </BigNavButton>
                    <BigNavButton className={classnames(classes.tab, { active: activeTab === 'posts' })} onClick={() => setActiveTab('posts')}>
                        Posts
                    </BigNavButton>
                    <BigNavButton className={classnames(classes.tab, { active: activeTab === 'chat' })} onClick={() => setActiveTab('chat')}>
                        Chat
                    </BigNavButton>
                </nav>
                <div className={classnames(classes.content)}>
                    {<About active={activeTab === 'about'} />}
                    {<Threads active={activeTab === 'threads'} />}
                    {<Posts active={activeTab === 'posts'} />}
                    {<Chat active={activeTab === 'chat'} />}
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            {render()}
        </>
    );
}
