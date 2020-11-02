import { ErrorModalContext } from '../contexts/ErrorModalContext';
import React, { useState, useEffect, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import { mdiLoading } from '@mdi/js';
import Http from '../classes/Http';
import Header from './Header';
import Icon from '@mdi/react';

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
            '&:hover, &:focus': {
                transform: 'scale(1.02)',
            },
            '&:hover': {
                color: 'var(--text-primary)',
                textDecoration: 'none',
            },
            '&:focus': {
                backgroundColor: 'var(--color-main)',
                color: 'var(--color-primary)',
                '& img': {
                    filter: 'brightness(0) invert(1)',
                }
            },
        },
        icon: {
            width: 50,
        },
    });
    const classes = styles();

    const [loadingCategories, setLoadingCategories] = useState(true);
    const { setError } = useContext(ErrorModalContext);
    const [categories, setCategories] = useState([]);

    useEffect(async () => {
        const response = await Http.get('categories');
        if (response.code === 200) setCategories(response.data);
        setLoadingCategories(false);
    }, []);

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
                        className={`${classes.category} rounded p-4 center-children pointer col`}
                        to={`/category/${category.name.toLowerCase()}`}
                        key={category.id}
                    >
                        <img
                            src={`${location.origin}/storage/category-icons/${category.icon}.svg`}
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

    return (
        <>
            <Header />
            <div className={`${classes.categories} no-select`}>
                {categoriesRender()}
            </div>
        </>
    );
}
