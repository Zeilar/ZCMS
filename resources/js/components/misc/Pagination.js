import { NavLink, useRouteMatch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

export default function Pagination({ pagination, containerClassname = '', ref, ...props }) {
    if (pagination.total <= pagination.perPage) return null;

    const [active, setActive] = useState(1);
    const [url, setUrl] = useState('');
    const route = useRouteMatch();

    useEffect(() => {
        const page = route.params.page;
        const url = route.url;
        setUrl(page == null ? url : url.slice(0, url.length - page.length - 1));
        setActive(page ?? 1);
    }, [route]);

    const styles = createUseStyles({
        paginator: {
            margin: [20, 0],
        },
        item: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            color: 'var(--text-primary)',
            padding: [5, 10],
            marginRight: 10,
            '&.active, &:focus': {
                backgroundColor: 'var(--color-main)',
                color: 'var(--color-primary)',
            },
            '&:hover': {
                textDecoration: 'none',
            },
            '&:hover:not(.active)': {
                backgroundColor: 'var(--color-link)',
                color: 'var(--color-primary)',
            },
        },
    });
    const classes = styles();

    return (
        <nav className={`${classes.paginator} ${containerClassname} no-select`} {...props}>
            {
                Array(pagination.lastPage).fill().map((item, i) => (
                    <NavLink className={classnames(classes.item, { active: active === i + 1 })} to={`${url}/${i + 1}`} key={i}>
                        {i + 1}
                    </NavLink>
                ))
            }
        </nav>
    );
}
