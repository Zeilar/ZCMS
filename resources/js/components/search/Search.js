import { errorCodeHandler } from '../../functions/helpers';
import { FeedbackModalContext } from '../../contexts';
import { createUseStyles } from 'react-jss';
import { Users, Threads, Posts } from './';
import { NavLink } from 'react-router-dom';
import { Tab } from '../styled-components';
import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { mdiLoading } from '@mdi/js';
import { Http } from '../../classes';
import { HttpError } from '../http';
import classnames from 'classnames';
import { Header } from '../layout';
import Icon from '@mdi/react';

export default function Search() {
    const styles = createUseStyles({
        container: {
            margin: [0, 'var(--container-margin)'],
        },
        header: {
            '& span': {
                
            },
        },
        tab: {
            fontFamily: 'TitilliumWeb !important',
        },
        content: {
            
        },
    });
    const classes = styles();

    const { setMessage } = useContext(FeedbackModalContext);
    const { query, tab, page } = useParams();

    const { data, status } = useQuery([page ?? '1', `search-${query}`], async () => {
        if (!query) return;
        const { data, code } = await Http.get(`search?q=${query}&page=${page ?? '1'}`);
        errorCodeHandler(code, message => setMessage(message));
        return data;
    }, { retry: false });

    return (
        <>
            <Header />
            <div className={classnames(classes.container, 'col my-4')}>
                {query && <h1 className={classnames(classes.header)}><span>Search results for</span> {query}</h1>}
                <div className={classnames('row mt-2 py-2')}>
                    {status === 'loading' && <Icon className={classnames('color-main center-self loadingWheel-2')} path={mdiLoading} spin={1} />}
                    {
                        status === 'success' && data &&
                            <>
                                <Tab className={classnames(classes.tab)} as={NavLink} to={`/search/${query}/users`}>
                                    Users ({data.users.total})
                                </Tab>
                                <Tab className={classnames(classes.tab)} as={NavLink} to={`/search/${query}/threads`}>
                                    Threads ({data.threads.total})
                                </Tab>
                                <Tab className={classnames(classes.tab)} as={NavLink} to={`/search/${query}/posts`}>
                                    Posts ({data.posts.total})
                                </Tab>
                            </>
                    }
                </div>
                <div className={classnames(classes.content, 'col')}>
                    {tab === 'users' && status === 'success' && data && <Users data={data.users} />}
                    {tab === 'threads' && status === 'success' && data && <Threads data={data.threads} />}
                    {tab === 'posts' && status === 'success' && data && <Posts data={data.posts} />}
                </div>
            </div>
        </>
    );
}
