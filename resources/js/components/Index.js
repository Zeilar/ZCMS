import { mdiChat, mdiEye, mdiLoading } from '@mdi/js';
import { NavLink, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Http from '../classes/Http';
import Header from './Header';
import Icon from '@mdi/react';

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
        },
        title: {
            color: 'var(--text-primary)',
            textDecoration: 'none',
            width: '60%',
        },
        stats: {
            width: '7.5%',
        },
        latest: {
            width: '10%',
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
                    <div className={`${classes.thread} rounded row p-3 mb-3`} key={thread.id}>
                        <NavLink className={classes.title} to={`/thread/${thread.slug}`}>
                            {thread.title}
                        </NavLink>
                        <div className={`${classes.stats} ml-auto mr-3 row`}>
                            <Icon className="mr-1" path={mdiChat} />
                            <span>{thread.posts}</span>
                        </div>
                        <div className={`${classes.stats} mr-auto ml-3 row`}>
                            <Icon className="mr-1" path={mdiEye} />
                            <span>{thread.views}</span>
                        </div>
                        <div className={`${classes.latest} d-flex`}>
                            <NavLink className="ml-auto btn-outline" to={`/thread/${thread.slug}/#${thread.latestPost.id}`}>
                                Latest
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
            <div className={`${classes.categories} no-select m-4`}>
                {categoriesRender()}
            </div>
            <div className={`${classes.threads} col relative`}>
                {threadsRender()}
            </div>
        </>
    );
}
