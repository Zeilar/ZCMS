import { ErrorModalContext } from '../contexts/ErrorModalContext';
import React, { useState, useEffect, useContext } from 'react';
import { mdiForum, mdiEye, mdiLoading } from '@mdi/js';
import { NavLink, useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Http from '../classes/Http';
import Header from './Header';
import Icon from '@mdi/react';

import Tooltip from './misc/Tooltip';

export default function Index(props) {
    const styles = createUseStyles({
        categories: {
            margin: [50, 'var(--container-margin)'],
            gridTemplateColumns: 'repeat(3, 1fr)',
            display: 'grid',
            gridGap: 50,
        },
        category: {
            boxShadow: [0, 0, 10, 1, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.1s linear',
            color: 'var(--text-primary)',
            '&:hover, &.active': {
                transform: 'scale(1.02)',
            },
            '&:hover': {
                color: 'var(--text-primary)',
                textDecoration: 'none',
            },
            '&.active': {
                backgroundColor: 'var(--color-main)',
                color: 'var(--color-primary)',
            },
        },
        icon: {
            width: 50,
        },
        threads: {
            margin: [0, 'var(--container-margin)'],
            minHeight: 200,
        },
        thread: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            alignItems: 'center',
            padding: 15,
        },
        title: {
            width: '50%',
        },
        posts: {
            
        },
        views: {
            marginLeft: '7.5%',
        },
        latest: {
            position: 'relative',
            width: '20%',
        },
        latestLink: {
            
        },
    });
    const classes = styles();

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingThreads, setLoadingThreads] = useState(false);
    const [activeCategory, setActiveCategory] = useState(false);
    const { setError } = useContext(ErrorModalContext);
    const [categories, setCategories] = useState([]);
    const [threads, setThreads] = useState();
    const { category } = useParams();

    useEffect(async () => {
        const response = await Http.get('categories');
        if (response.code === 200) setCategories(response.data);
        setLoadingCategories(false);
    }, []);

    useEffect(() => {
        if (category) {
            categories.forEach(async element => {
                if (element.name.toLowerCase() === category.toLowerCase()) {
                    setActiveCategory(element.id);
                    setLoadingThreads(true);
                    const response = await Http.get(`threads?category=${element.id}`);
                    if (response.code === 200) setThreads(response.data);
                    setLoadingThreads(false);
                }
            });
        } else {
            setActiveCategory(null);
            setThreads(null);
        }
    }, [loadingCategories, category]);

    useEffect(() => {
        const error = props.location.state?.error;
        if (error) setError(error);
    }, [props.location.state]);

    const categoriesRender = () => {
        if (loadingCategories) {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        } else {
            if (categories.length > 0) {
                return categories.map(category => (
                    <NavLink
                        className={`${classes.category} rounded p-4 center-children pointer col ${activeCategory === category.id ? 'active' : ''}`}
                        to={`/category/${category.name.toLowerCase()}`}
                        key={category.id}
                    >
                        <img
                            src={`${location.origin}/storage/category-icons/${category.icon}${activeCategory === category.id ? '-white' : ''}.svg`}
                            className={`${classes.icon} mb-3`} alt={category.name}
                        />
                        <h2 className={classes.name}>
                            {category.name}
                        </h2>
                    </NavLink>
                ));
            } else {
                return <p className="text-center">No categories were found, please contact the webmaster!</p>;
            }
        }
    }

    const threadsRender = () => {
        if (loadingThreads) {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        } else {
            if (threads == null) return;
            if (threads.length === 0) {
                return <p className="text-center">No threads were found, be the first to create one!</p>;
            } else {
                return threads.map(thread => (
                    <div className={`${classes.thread} rounded row mb-3`} key={thread.id}>
                        <p className={classes.title}>
                            <NavLink to={`/thread/${thread.slug}`}>
                                {thread.title}
                            </NavLink>
                        </p>
                        <Tooltip tagName="div" className={`${classes.posts} ml-auto col center-children`} title="Posts">
                            <Icon path={mdiForum} />
                            <span>{thread.postsAmount}</span>
                        </Tooltip>
                        <Tooltip tagName="div" className={`${classes.views} mr-auto col center-children`} title="Views">
                            <Icon path={mdiEye} />
                            <span>{thread.views}</span>
                        </Tooltip>
                        <div className={`${classes.latest} col`} title="Latest post">
                            <span className={`${classes.latestDate} ml-auto`}>
                                Some date
                            </span>
                            <NavLink className={`${classes.latestLink} ml-auto`} to={`/thread/${thread.slug}/#${thread.latestPost.id}`}>
                                By {thread.latestPost.user.username}
                            </NavLink>
                        </div>
                    </div>
                ));
            }
        }
    }

    return (
        <>
            <Header />
            <div className={`${classes.categories} no-select`}>
                {categoriesRender()}
            </div>
            <div className={`${classes.threads} col relative`}>
                {threadsRender()}
            </div>
        </>
    );
}
