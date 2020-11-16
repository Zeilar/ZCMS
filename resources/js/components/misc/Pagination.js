import { NavLink, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function Pagination({ pagination, containerClassname = '', ref, ...props }) {
    if (pagination.total <= pagination.perPage) return null;

    const [active, setActive] = useState(1);
    const [url, setUrl] = useState('');
    const route = useRouteMatch();
    const history = useHistory();
    let { page } = useParams();
    page = parseInt(page);

    const [input, setInput] = useState(page);

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
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.1)'],
            backgroundColor: 'var(--color-primary)',
            color: 'var(--text-primary)',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: [8, 12],
            borderRadius: 2,
            marginRight: 10,
            display: 'flex',
            minWidth: 40,
            '&.disabled': {
                pointerEvents: 'none',
                opacity: 0.35,
            },
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
        icon: {
            width: '1rem',
        },
        input: {
            border: '2px solid var(--color-main)',
            width: '3.8rem',
            '&:focus': {
                boxShadow: 'none',
            },
        },
    });
    const classes = styles();

    function goTo(e) {
        e.preventDefault();
        history.push(`${url}/${input || page}`);
    }

    const render = () => {
        let pages = [page];
        let offset = 8;

        while (offset > 0) {
            if (pages[0] > 1 && offset > 0) {
                pages.unshift(pages[0] - 1);
                offset -= 1;
            }
            if (pages[pages.length - 1] < pagination.lastPage && offset > 0) {
                pages.push(pages[pages.length - 1] + 1);
                offset -= 1;
            }
        }

        pages = pages.map(page => (
            <NavLink className={classnames(classes.item, { active: active === page })} to={`${url}/${page}`} key={page}>
                {page}
            </NavLink>
        ));

        if (!pages.find(page => parseInt(page.key) === 1)) {
            pages[0] = (
                <NavLink className={classnames(classes.item)} to={`${url}/1`} key={1}>
                    1
                </NavLink>
            );
        }
        if (!pages.find(page => parseInt(page.key) === pagination.lastPage)) {
            pages[pages.length - 1] = (
                <NavLink className={classnames(classes.item)} to={`${url}/${pagination.lastPage}`} key={pagination.lastPage}>
                    {pagination.lastPage}
                </NavLink>
            );
        }

        pages.unshift(
            <NavLink className={classnames(classes.item, { disabled: page <= 1 })} to={`${url}/${page - 1}`} key="prev">
                <Icon className={classnames(classes.icon)} path={mdiChevronLeft} />
            </NavLink>
        );
        pages.push(
            <NavLink className={classnames(classes.item, { disabled: page >= pagination.lastPage })} to={`${url}/${page + 1}`} key="next">
                <Icon className={classnames(classes.icon)} path={mdiChevronRight} />
            </NavLink>
        );

        if (page > 20 || page < pagination.lastPage - 20) {
            const item = pages[Math.ceil(pages.length / 2)];
            pages[Math.ceil(pages.length / 2)] = (
                <form key="goto" onSubmit={goTo}>
                    <input
                        className={classnames(classes.input, 'bold mr-2')}
                        onChange={e => setInput(e.target.value)}
                        max={pagination.lastPage}
                        placeholder={item.key}
                        value={input}
                        type="number"
                        min={1}
                    />
                </form>
            );
        }

        return pages;
    }

    return (
        <nav className={classnames(classes.paginator, containerClassname, 'no-select row')} {...props}>
            {render()}
        </nav>
    );
}
