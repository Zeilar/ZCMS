import { mdiForum, mdiEye, mdiLoading, mdiArrowRight } from '@mdi/js';
import { NavLink, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Http from '../classes/Http';
import Header from './Header';
import Icon from '@mdi/react';

import Tooltip from './misc/Tooltip';

export default function Index() {
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
            textDecoration: 'none',
            margin: 0,
            '&:hover, &.active': {
                transform: 'scale(1.02)',
            },
            '&:hover': {
                color: 'var(--text-primary)',
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
            color: 'var(--text-primary)',
            textDecoration: 'none',
            width: '60%',
        },
        posts: {
            
        },
        views: {
            marginLeft: '7.5%',
        },
        latest: {
            position: 'relative',
            '&:hover': {
                '& svg': {
                    right: 8,
                },
            },
        },
        latestText: {

        },
        latestIcon: {
            transition: 'inherit',
            position: 'absolute',
            right: 12,
        },
    });
    const classes = styles();

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingThreads, setLoadingThreads] = useState(false);
    const [activeCategory, setActiveCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [threads, setThreads] = useState();
    const { category } = useParams();

    useEffect(async () => {
        setCategories(await Http.get('categories'));
        setLoadingCategories(false);
    }, []);

    useEffect(() => {
        if (category) {
            categories.forEach(async element => {
                if (element.name.toLowerCase() === category.toLowerCase()) {
                    setActiveCategory(element.id);
                    setLoadingThreads(true);
                    setThreads(await Http.get(`threads?category=${element.id}`));
                    setLoadingThreads(false);
                }
            });
        }
    }, [loadingCategories, category]);

    const categoriesRender = () => {
        if (loadingCategories) {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        } else {
            if (categories.length > 0) {
                return categories.map(category => (
                    <NavLink
                        className={`${classes.category} rounded p-4 my-4 mx-auto center-children pointer col ${activeCategory === category.id ? 'active' : ''}`}
                        to={`/category/${category.name.toLowerCase()}`}
                        key={category.id}
                    >
                        <img
                            className={`${classes.icon} mb-3`}
                            src={`${location.origin}/storage/category-icons/${category.icon}${activeCategory === category.id ? '-white' : ''}.svg`}
                            alt={category.name}
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
                        <NavLink className={classes.title} to={`/thread/${thread.slug}`}>
                            {thread.title}
                        </NavLink>
                        <Tooltip tagName="div" className={`${classes.posts} ml-auto col center-children`} title="Posts">
                            <Icon path={mdiForum} />
                            <span>{thread.posts}</span>
                        </Tooltip>
                        <Tooltip tagName="div" className={`${classes.views} mr-auto col center-children`} title="Views">
                            <Icon path={mdiEye} />
                            <span>{thread.views}</span>
                        </Tooltip>
                        <NavLink
                            className={`${classes.latest} center-children btn-outline`}
                            to={`/thread/${thread.slug}/#${thread.latestPost.id}`}
                            title="Latest post"
                        >
                            <span className={`${classes.latestText} mr-3`}>Latest</span>
                            <Icon className={`${classes.latestIcon}`} path={mdiArrowRight} />
                        </NavLink>
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
