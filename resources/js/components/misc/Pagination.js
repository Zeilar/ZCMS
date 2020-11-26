import { NavLink, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function Pagination({ pagination, containerClassname = '', ref, ...props }) {
    if (pagination.total <= pagination.perPage) {
        return null;
    }

    const [url, setUrl] = useState('');
    const route = useRouteMatch();
    const { page } = useParams();
    const history = useHistory();

    const [input, setInput] = useState(parseInt(page) || 1);

    useEffect(() => {
        const url = route.url;
        setUrl(!page ? url : url.substring(0, url.lastIndexOf('/')));
    }, [route]);

    const styles = createUseStyles({
        item: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.1)'],
            backgroundColor: 'var(--color-primary)',
            color: 'var(--text-primary)',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: [8, 12],
            borderRadius: 3,
            marginRight: 10,
            display: 'flex',
            minWidth: 40,
            '&.disabled': {
                pointerEvents: 'none',
                opacity: 0.5,
            },
            '&.active': {
                backgroundImage: 'var(--color-main-gradient)',
                color: 'var(--color-primary)',
            },
            '&:hover, &:focus': {
                textDecoration: 'none',
                '&:not(.active):not(.disabled)': {
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
        const currentPage = parseInt(page) || 1;

        let pages = [currentPage];
        let offset = 8;

        while (offset > 0) {
            if (pages[0] > 1 && offset > 0) {
                pages.unshift(pages[0] - 1);
                offset -= 1;
                continue;
            }
            if (pages[pages.length - 1] < pagination.lastPage && offset > 0) {
                pages.push(pages[pages.length - 1] + 1);
                offset -= 1;
                continue;
            }
            break;
        }

        pages = pages.map(number => (
            <NavLink
                className={classnames(classes.item, { active: currentPage === 1 && currentPage === number })}
                to={`${url}/${number}`}
                key={number}
            >
                {number}
            </NavLink>
        ));

        if (!pages.find(page => parseInt(page.key) === 1)) {
            pages.unshift(
                <NavLink className={classnames(classes.item)} to={`${url}/1`} key={1}>
                    1
                </NavLink>
            );
        }
        if (!pages.find(page => parseInt(page.key) === pagination.lastPage)) {
            pages.push(
                <NavLink className={classnames(classes.item)} to={`${url}/${pagination.lastPage}`} key={pagination.lastPage}>
                    {pagination.lastPage}
                </NavLink>
            );
        }

        pages.unshift(
            <NavLink className={classnames(classes.item, { disabled: currentPage <= 1 })} to={`${url}/${currentPage - 1}`} key="prev">
                <Icon className={classnames(classes.icon)} path={mdiChevronLeft} />
            </NavLink>
        );
        pages.push(
            <NavLink
                className={classnames(classes.item, { disabled: currentPage >= pagination.lastPage })}
                to={`${url}/${currentPage + 1}`}
                key="next"
            >
                <Icon className={classnames(classes.icon)} path={mdiChevronRight} />
            </NavLink>
        );

        // If more than 20 pages, display a goto-page button
        if (pagination.lastPage >= 20) {
            const item = pages[Math.ceil(pages.length / 2)];
            pages.splice(pages.indexOf(item), 0, (
                <form key="goto" onSubmit={goTo}>
                    <input
                        className={classnames(classes.input, 'bold mr-2')}
                        onChange={e => setInput(e.target.value)}
                        max={pagination.lastPage}
                        placeholder={page}
                        value={input}
                        type="number"
                        min={1}
                    />
                </form>
            ));
        }

        return pages;
    }

    return (
        <nav className={classnames(classes.paginator, containerClassname, 'no-select my-3 row')} {...props}>
            {render()}
        </nav>
    );
}
