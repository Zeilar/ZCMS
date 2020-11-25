import React, { useEffect, useState, useContext } from 'react';
import { mdiArrowLeft, mdiLoading, mdiPlusBox } from '@mdi/js';
import { Back, TableTitle } from '../styled-components';
import { ucfirst } from '../../functions/helpers';
import { UserContext } from '../../contexts';
import { createUseStyles } from 'react-jss';
import { Thread, Header } from '../layout';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Pagination } from '../misc';
import { Http } from '../../classes';
import { HttpError } from '../http';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function Category() {
    const styles = createUseStyles({
        container: {
            padding: [0, 'var(--container-margin)'],
        },
        categoryIcon: {
            filter: 'brightness(0) invert(1)',
            height: 25,
            width: 25,
        },
        threads: {
            minHeight: 100,
        },
        newIcon: {
            width: '1.5rem',
        },
    });
    const classes = styles();

    const [threadsStatus, setThreadsStatus] = useState('loading');
    const [threads, setThreads] = useState({ data: [] });
    const [httpError, setHttpError] = useState(false);
    const { user } = useContext(UserContext);
    const { category, page } = useParams();

    useEffect(async () => {
        const response = await Http.get(`threads?category=${category}&page=${page ?? 1}`);
        if (response.code !== 404 && response.code !== 200) setThreadsStatus('error');
        if (response.code === 200) setThreads(response.data);
        setThreadsStatus('success');
    }, [category]);

    const dbCategory = useQuery(`dbCategory-${category}`, async () => {
        const response = await Http.get(`categories/${category}`);
        if (response.code !== 200) return setHttpError(response.code);
        return response.data;
    }, { retry: false });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category, page]);

    if (httpError) return <HttpError code={httpError} />

    const render = () => {
        if (dbCategory.status === 'loading') {
            return <Icon className={classnames('loadingWheel-2 m-auto')} path={mdiLoading} spin={1} />
        }
        return (
            <>
                <div className={classnames('row mb-2')}>
                    <Back as={NavLink} to="/">
                        <Icon path={mdiArrowLeft} />
                    </Back>
                    <TableTitle>
                        {
                            dbCategory.status === 'success' &&
                                <img
                                    src={`/storage/category-icons/${dbCategory.data.icon}.svg`}
                                    className={classes.categoryIcon}
                                    alt={ucfirst(category)}
                                />
                        }
                        <h2 className="ml-2">{ucfirst(category)}</h2>
                    </TableTitle>
                </div>
                {
                    user &&
                        <div className={classnames('row mt-2')}>
                            <NavLink className={classnames('btn caps center-children')} to={`/category/${dbCategory.data?.name}/new`}>
                                <Icon className={classnames(classes.newIcon, 'mr-1')} path={mdiPlusBox} />
                                <span>New thread</span>
                            </NavLink>
                        </div>
                }
                <div className={`${classes.threads} col mt-2 relative`}>
                    {renderThreads()}
                    {
                        threadsStatus === 'success' && threads.data.length > 0
                            ? <Pagination pagination={{
                                currentPage: threads.current_page,
                                lastPage: threads.last_page,
                                perPage: threads.per_page,
                                total: threads.total,
                            }} />
                            : null
                    }
                </div>
            </>
        );
    }

    const renderThreads = () => {
        if (threadsStatus === 'loading') {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        }
        if (threadsStatus === 'error') {
            return <h3 className={classnames('text-center mt-3')}>Error retrieving the threads</h3>;
        }
        if (threadsStatus === 'success') {
            if (threads.data.length <= 0) {
                return <h3 className={classnames('text-center mt-3')}>No threads were found, be the first to create one!</h3>;
            }
            return threads.data.map(thread => <Thread thread={thread} key={thread.id} />);
        }
    }

    return (
        <>
            <Header />
            <div className={`${classes.container} col py-4`}>
                {render()}
            </div>
        </>
    );
}