import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import { mdiLoading } from '@mdi/js';
import Http from '../classes/Http';
import Header from './Header';
import Icon from '@mdi/react';

export default function Index() {
    const styles = createUseStyles({
        categories: {
            justifyContent: 'center',
            margin: [50, '10%'],
        },
        category: {
            boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.15)',
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.1s linear',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            height: 250,
            width: 250,
            '&:hover': {
                transform: 'scale(1.02)',
            },
            '&.active': {
                backgroundColor: 'var(--color-main)',
                color: 'white',
            },
        },
        icon: {
            width: 50,
        },
    });
    const classes = styles();

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingThreads, setLoadingThreads] = useState(false);
    const [activeCategory, setActiveCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [threads, setThreads] = useState();

    async function changeCategory(id) {
        setActiveCategory(id);
        setLoadingThreads(true);
        setThreads(await Http.get(`threads?category=${id}`))
        setLoadingThreads(false);
    }

    useEffect(async () => {
        setCategories(await Http.get('categories'));
        setLoadingCategories(false);
    }, []);

    const categoriesRender = () => {
        if (loadingCategories) {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        } else {
            if (categories.length > 0) {
                return categories.map(category => (
                    <div
                        className={`${classes.category} rounded p-4 m-4 center-children pointer col ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => changeCategory(category.id)}
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
                    </div>
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
                    thread.title
                ));
            }
        }
    }

    return (
        <>
            <Header />
            <div className={`${classes.categories} row relative m-4`}>
                {categoriesRender()}
            </div>
            <div className={`${classes.threads} col relative`}>
                {threadsRender()}
            </div>
        </>
    );
}
