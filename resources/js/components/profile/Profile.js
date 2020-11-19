import { humanReadableDate } from '../../functions/helpers';
import { BigNavButton } from '../styled-components';
import { createUseStyles } from 'react-jss';
import HttpError from '../http/HttpError';
import { useParams } from 'react-router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Http from '../../classes/Http';
import { mdiLoading } from '@mdi/js';
import classnames from 'classnames';
import Threads from './Threads';
import Header from '../Header';
import Icon from '@mdi/react';
import Posts from './Posts';
import Chat from './Chat';
import { NavLink } from 'react-router-dom';

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
        tab: {
            fontFamily: 'TitilliumWeb !important',
            margin: [0, 20],
            padding: 10,
        },
        signature: {
            fontFamily: 'RobotoSlab',
            fontSize: '1.15rem',
        },
        metabox: {
            fontFamily: 'TitilliumWeb',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            margin: [0, 40],
        },
        metaheader: {
            fontWeight: 'normal',
            fontSize: '1.25rem',
            marginBottom: 10,
        },
        metavalue: {
            fontSize: '1.5rem',
        },
    });
    const classes = styles();

    const { id, tab } = useParams();

    const { data, status } = useQuery(`profile-${id}`, async () => {
        const { data, code } = await Http.get(`profile/${id}`);
        if (code !== 200) return code;
        return data;
    }, { retry: false });

    const threads = useQuery(`profile-${id}-threads`, async () => {
        const response = await Http.get(`profile/${id}/threads`, null, { Accept: null });
        return response.data;
    }, { retry: false });

    const posts = useQuery(`profile-${id}-posts`, async () => {
        const response = await Http.get(`profile/${id}/posts`, null, { Accept: null });
        return response.data;
    }, { retry: false });

    if (data === 404) return <HttpError code={data} />

    const render = () => {
        if (status === 'loading') {
            return <Icon className={classnames(classes.loading, 'loadingWheel-3 center-self')} path={mdiLoading} spin={1} />
        }
        return (
            <div className={classnames(classes.container, 'mt-5')}>
                <div className={classnames('col center-children')}>
                    <img className={classnames(classes.avatar, 'round')} src={`/storage/avatars/${data.avatar}`} alt="Profile avatar" />
                    <h1 className={classnames(classes.username, `color-${data.roles[0].clearance}`, 'mt-3')}>{data.username}</h1>
                    {data.signature && <p className={classnames(classes.signature, 'mt-3')}>{data.signature}</p>}
                </div>
                <div className={classnames('col center-children mt-4')}>
                    <div className={classnames('row center-children')}>
                        <div className={classnames(classes.metabox)}>
                            <h4 className={classnames(classes.metaheader)}>Rank</h4>
                            <h3 className={classnames(classes.metavalue, 'ucfirst')}>{data.rank}</h3>
                        </div>
                        <div className={classnames(classes.metabox)}>
                            <h4 className={classnames(classes.metaheader)}>Posts</h4>
                            <h3 className={classnames(classes.metavalue)}>{data.postsAmount}</h3>
                        </div>
                        <div className={classnames(classes.metabox)}>
                            <h4 className={classnames(classes.metaheader)}>Reputation</h4>
                            <h3 className={classnames(classes.metavalue)}>{data.likesAmount}</h3>
                        </div>
                        <div className={classnames(classes.metabox)}>
                            <h4 className={classnames(classes.metaheader)}>Joined</h4>
                            <h3 className={classnames(classes.metavalue)}>{humanReadableDate(data.created_at)}</h3>
                        </div>
                    </div>
                </div>
                <nav className={classnames('center-children mt-4')}>
                    <BigNavButton as={NavLink} className={classnames(classes.tab, { active: tab === 'threads' })} to={`/user/${id}/threads`}>
                        Threads
                    </BigNavButton>
                    <BigNavButton as={NavLink} className={classnames(classes.tab, { active: tab === 'posts' })} to={`/user/${id}/posts`}>
                        Posts
                    </BigNavButton>
                    <BigNavButton as={NavLink} className={classnames(classes.tab, { active: tab === 'chat' })} to={`/user/${id}/chat`}>
                        Chat
                    </BigNavButton>
                </nav>
                <div className={classnames('col mt-4')}>
                    {tab === 'threads' && <Threads threads={threads} />}
                    {tab === 'posts' && <Posts posts={posts} />}
                    {tab === 'chat' && <Chat />}
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
