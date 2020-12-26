import { humanReadableDate } from '../../functions/helpers';
import { Tab } from '../styled-components';
import { UserContext } from '../../contexts';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import { Posts, Threads, Chat } from './';
import React, { useContext } from 'react';
import HttpError from '../http/HttpError';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { mdiLoading } from '@mdi/js';
import { Http } from '../../classes';
import classnames from 'classnames';
import { Header } from '../layout';
import Icon from '@mdi/react';

export default function Profile() {
    const styles = createUseStyles({
        container: {
            margin: [0, 'var(--container-margin)'],
        },
        content: {
            minHeight: 200,
        },
        avatar: {
            border: '2px solid black',
            width: 100,
        },
        username: {
            fontFamily: 'Merriweather',
        },
        tabs: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.05)'],
        },
        tab: {
            fontFamily: 'TitilliumWeb !important',
            transform: 'none !important',
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

    const { user } = useContext(UserContext);
    const { id, tab } = useParams();

    const { data, status } = useQuery(`profile-${id}`, async () => {
        const { data, code } = await Http.get(`profile/${id}`);
        if (code !== 200) return code;
        return data;
    }, { retry: false });

    if (data === 404) return <HttpError code={data} />

    const isOwnProfile = () => user && user.id === data.id;

    const render = () => {
        if (status === 'loading') {
            return <Icon className={classnames('loadingWheel-2 center-self')} path={mdiLoading} spin={1} />
        }
        return (
            <div className={classnames(classes.container, 'mt-4')}>
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
                <nav className={classnames(classes.tabs, 'center-children mt-4 mx-auto w-fit')}>
                    <Tab as={NavLink} className={classnames(classes.tab)} to={`/user/${id}/threads`}>
                        Threads
                    </Tab>
                    <Tab as={NavLink} className={classnames(classes.tab)} to={`/user/${id}/posts`}>
                        Posts
                    </Tab>
                    {
                        !isOwnProfile() &&
                            <Tab as={NavLink} className={classnames(classes.tab)} to={`/user/${id}/chat`}>
                                Chat
                            </Tab>
                    }
                </nav>
                <div className={classnames(classes.content, 'col py-4 relative')}>
                    {tab === 'threads' && <Threads />}
                    {tab === 'posts' && <Posts />}
                    {tab === 'chat' && !isOwnProfile() && <Chat />}
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
