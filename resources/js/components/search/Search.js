import { errorCodeHandler } from '../../functions/helpers';
import { FeedbackModalContext } from '../../contexts';
import { createUseStyles } from 'react-jss';
import { Users, Threads, Posts } from './';
import { NavLink } from 'react-router-dom';
import { Tab } from '../styled-components';
import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { mdiLoading } from '@mdi/js';
import { Http } from '../../classes';
import { Searchbar } from '../misc';
import classnames from 'classnames';
import { Header } from '../layout';
import Icon from '@mdi/react';

export default function Search() {
    const styles = createUseStyles({
        container: {
            margin: [0, 'var(--container-margin)'],
        },
        query: {
            backgroundImage: 'var(--color-main-gradient)',
            color: 'var(--color-primary)',
            borderRadius: 4,
        },
        tab: {
            fontFamily: 'TitilliumWeb !important',
        },
    });
    const classes = styles();

    const { setMessage } = useContext(FeedbackModalContext);
    const { query, tab, page } = useParams();
    const history = useHistory();

    const { data, status } = useQuery([page ?? '1', `search-${query}`], async () => {
        if (!query) return;
        const { data, code } = await Http.get(`search?q=${query}&page=${page ?? '1'}`);
        errorCodeHandler(code, message => setMessage(message));
        return data;
    }, { retry: false });

    function search(e, input) {
        e.preventDefault();
        if (!input) return;
        history.push(`/search/${input}`);
    }

    return (
        <>
            <Header />
            <div className={classnames(classes.container, 'col my-4')}>
                <Searchbar defaultValue={query} onSubmit={search} />
                {
                    query &&
                        <h1 className={classnames('w-fit')}>
                            Results for <span className={classnames(classes.query, 'p-2')}>{query}</span>
                        </h1>
                }
                <div className={classnames('row mt-3 py-2')}>
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
                <div className={classnames('col')}>
                    {tab === 'users' && status === 'success' && data && <Users data={data.users} />}
                    {tab === 'threads' && status === 'success' && data && <Threads data={data.threads} />}
                    {tab === 'posts' && status === 'success' && data && <Posts data={data.posts} />}
                </div>
            </div>
        </>
    );
}
