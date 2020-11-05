import { mdiArrowLeft, mdiEye, mdiForum, mdiLoading } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import { ucfirst } from '../../functions/helpers';
import { createUseStyles } from 'react-jss';
import Pagination from '../misc/Pagination';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import Tooltip from '../misc/Tooltip';
import Http from '../../classes/Http';
import Header from '../Header';
import Icon from '@mdi/react';

export default function Threads() {
    const styles = createUseStyles({
        container: {
            padding: [0, 'var(--container-margin)'],
        },
        header: {

        },
        headerText: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.25)'],
            backgroundImage: 'var(--color-main-gradient)',
            color: 'var(--color-primary)',
            alignItems: 'center',
            borderRadius: 2,
            padding: 15,
        },
        back: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.25)'],
            backgroundImage: 'var(--color-main-gradient)',
            color: 'var(--color-primary)',
            borderRadius: 2,
            padding: 15,
            '&:hover': {
                color: 'var(--color-primary)',
            },
        },
        categoryIcon: {
            filter: 'brightness(0) invert(1)',
            height: 25,
            width: 25,
        },
        threads: {
            minHeight: 100,
        },
        thread: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.1s linear',
            alignItems: 'center',
            borderRadius: 2,
            padding: 15,
            '&:hover': {
                backgroundColor: 'var(--bg-color)',
            }
        },
        title: {
            width: '50%',
        },
        titleText: {
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: 'bold',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        op: {
            color: 'var(--text-secondary)',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        posts: {
            
        },
        views: {
            marginLeft: '7.5%',
        },
        latest: {
            width: '15%',
        },
        latestLink: {
            color: 'var(--text-primary)',
            fontWeight: 'bold',
            '&:hover': {
                color: 'var(--color-link)',
                textDecoration: 'none',
            },
        },
        latestDate: {
            fontSize: '0.85rem',
        },
    });
    const classes = styles();

    const [threadsLoaded, setThreadsLoaded] = useState(false);
    const [pagination, setPagination] = useState({});
    const [dbCategory, setDbCategory] = useState();
    const [threads, setThreads] = useState([]);
    const { category, page } = useParams();
    const header = useRef();

    useEffect(async () => {
        if (category) {
            setThreadsLoaded(false);
            const pageQuery = page ? `&page=${page}` : '';

            const response = await Http.get(`threads?category=${category}${pageQuery}`);
            if (response.code === 200) {
                setThreads(response.data.data);
                const pagination = response.data;
                setPagination({ currentPage: pagination.current_page, lastPage: pagination.last_page });
            }
        } else {
            setThreads(null);
        }
        setThreadsLoaded(true);
        window.scrollTo(0, 0);
    }, [category, page]);

    useEffect(async () => {
        const response = await Http.get(`categories/${category}`);
        if (response.code === 200) {
            setDbCategory(response.data);
        } else {
            setDbCategory(false);
        }
    }, [category]);

    const renderThreads = () => {
        if (!threadsLoaded) {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        } else {
            if (threads.length <= 0) {
                return <p className="text-center">No threads were found</p>;
            } else {
                return threads.map(thread => (
                    <div className={`${classes.thread} row mt-1`} key={thread.id}>
                        <div className={`${classes.title} col`}>
                            <NavLink className={classes.titleText} to={`/thread/${thread.slug}`}>
                                {thread.title}
                            </NavLink>
                            <NavLink
                                className={`${classes.op} color-${thread.latestPost.user.roles[0].clearance} bold mt-2 mr-auto`}
                                to={`/user/${thread.op.username}`}
                            >
                                {thread.op.username}
                            </NavLink>
                        </div>
                        <Tooltip className={`${classes.posts} ml-auto col center-children`} title="Posts">
                            <Icon path={mdiForum} />
                            <span>{thread.postsAmount}</span>
                        </Tooltip>
                        <Tooltip className={`${classes.views} mr-auto col center-children`} title="Views">
                            <Icon path={mdiEye} />
                            <span>{thread.views}</span>
                        </Tooltip>
                        <div className={`${classes.latest} col`}>
                            <span className={`${classes.latestDate} ml-auto`}>
                                Some date
                            </span>
                            <NavLink
                                className={`${classes.latestLink} color-${thread.latestPost.user.roles[0].clearance} ml-auto mt-2`}
                                to={`/thread/${thread.slug}/#${thread.latestPost.id}`}
                            >
                                {thread.latestPost.user.username}
                            </NavLink>
                        </div>
                    </div>
                ));
            }
        }
    }

    return (
        <>
            <Header forwardRef={header} />
            <div className={`${classes.container} py-4`}>
                <h2 className={`${classes.header} row mb-2`}>
                    <NavLink className={`${classes.back} d-flex mr-2`} to="/">
                        <Icon path={mdiArrowLeft} />
                    </NavLink>
                    <div className={`${classes.headerText} row w-100`}>
                        {
                            dbCategory &&
                                <img
                                    className={classes.categoryIcon}
                                    src={`${window.location.origin}/storage/category-icons/${dbCategory.icon}.svg`}
                                    alt={ucfirst(category)}
                                />
                        }
                        <span className="ml-2">{ucfirst(category)}</span>
                    </div>
                </h2>
                <div className={`${classes.threads} col relative`}>
                    {renderThreads()}
                    {threads.length > 0 && threadsLoaded && <Pagination pagination={pagination} />}
                </div>
            </div>
        </>
    );
}