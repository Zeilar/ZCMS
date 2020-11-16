import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

export default function Pagination({ pagination, containerClassname = '', ref, ...props }) {
    if (pagination.total <= pagination.perPage) return null;

    const [active, setActive] = useState(1);
    const [url, setUrl] = useState('');
    const route = useRouteMatch();
    let { page } = useParams();
    page = parseInt(page);

    useEffect(() => {
        const url = route.url;
        setUrl(page == null ? url : url.slice(0, url.length - String(page).length - 1));
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
            '&.active': {
                backgroundColor: 'var(--color-main)',
                color: 'var(--color-primary)',
            },
            '&:hover, &:focus': {
                textDecoration: 'none',
                '&:not(.active)': {
                    backgroundColor: 'var(--color-dark)',
                    color: 'var(--color-primary)',
                },
            },
        },
    });
    const classes = styles();

    const render = () => {
        const pages = [page];
        let offset = 9;

        while (offset > 0) {
            if (pages[0] > 1) {
                pages.unshift(pages[0] - 1);
                offset -= 1;
            }
            if (pages[pages.length - 1] < pagination.lastPage) {
                pages.push(pages[pages.length - 1] + 1);
                offset -= 1;
            }
        }

        return pages.map(page => (
            <NavLink className={classnames(classes.item, { active: active === page })} to={`${url}/${page}`} key={page}>
                {page}
            </NavLink>
        ));
    }

    return (
        <nav className={classnames(classes.paginator, containerClassname, 'no-select')} {...props}>
            {render()}
        </nav>
    );
}
