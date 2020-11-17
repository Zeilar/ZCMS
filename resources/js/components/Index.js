import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { mdiLoading } from '@mdi/js';
import classnames from 'classnames';
import Http from '../classes/Http';
import Header from './Header';
import Icon from '@mdi/react';
import React from 'react';

export default function Index() {
    const styles = createUseStyles({
        categories: {
            margin: [50, 'var(--container-margin)'],
            gridTemplateColumns: 'repeat(4, 1fr)',
            display: 'grid',
            gridGap: 50,
        },
        category: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.05s linear',
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
                '& svg, img': {
                    filter: 'brightness(0) invert(1)',
                }
            },
        },
        icon: {
            width: 50,
        },
    });
    const classes = styles();
    
    const { data, status } = useQuery('categories', async () => {
        const response = await Http.get('categories');
        return response.data;
    });

    const categoriesRender = () => {
        if (status === 'loading') {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        }
        if (status === 'error') {
            return <p className="text-center">Something went wrong loading the categories!</p>;
        }
        if (status === 'success') {
            if (data.length > 0) {
                return data.map(category => (
                    <NavLink
                        className={`${classes.category} rounded p-4 center-children pointer col`}
                        to={`/category/${category.name.toLowerCase()}`}
                        key={category.id}
                    >
                        <img
                            src={`/storage/category-icons/${category.icon}.svg`}
                            className={classnames(classes.icon, 'mb-3')} alt={category.name}
                        />
                        <h2 className={classes.name}>
                            {category.name}
                        </h2>
                    </NavLink>
                ));
            }
            return <p className="text-center">No categories were found, please contact the webmaster!</p>;
        }
    }

    return (
        <>
            <Header />
            <div className={classnames(classes.categories, 'no-select')}>
                {categoriesRender()}
            </div>
        </>
    );
}
