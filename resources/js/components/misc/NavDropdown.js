import useOnclickOutside from 'react-cool-onclickoutside';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import classnames from 'classnames';

export default function NavDropdown({ containerClassName = '', toggler, items = [], align = 'right' }) {
    const styles = createUseStyles({
        toggler: {
            fontSize: '1.25rem',
            background: 'none',
            border: 0,
        },
        listWrapper: {
            transform: 'translateX(-50%)',
            paddingTop: 10,
            left: '50%',
        },
        list: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            borderRadius: 4,
        },
        item: {
            borderTop: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--text-primary)',
            fontFamily: 'TitilliumWeb',
            transition: 'none',
            padding: [15, 35],
            '&:hover': {
                backgroundImage: 'var(--color-main-gradient)',
                color: 'var(--color-primary)',
                borderColor: 'transparent',
                textDecoration: 'none',
            },
            '&:first-child': {
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
                borderTop: 0,
            },
            '&:last-child': {
                borderBottomRightRadius: 4,
                borderBottomLeftRadius: 4,
            },
        },
    });
    const classes = styles();

    const [open, setOpen] = useState(false);

    const wrapper = useOnclickOutside(() => {
        setOpen(false);
    });

    return (
        <div
            className={classnames('relative p-2 pointer no-select', { 'ml-4': align === 'right', 'mr-4': align !== 'right', containerClassName })}
            onMouseLeave={() => setOpen(false)}
            onMouseEnter={() => setOpen(true)}
            ref={wrapper}
        >
            <button className={classnames(classes.toggler, 'color-main center-children bold')} onClick={() => setOpen(p => !p)}>
                {toggler}
            </button>
            <div className={classnames(classes.listWrapper, 'absolute')}>
                <ul className={classnames(classes.list, 'col')}>
                    {
                        open && items.length > 0 && items.map(item => (
                            item.args?.router === false
                                ? <a
                                    className={classnames(classes.item, 'relative bold')}
                                    href={`${window.location.origin}${item.to.pathname}`}
                                    onClick={() => setOpen(false)}
                                    key={item.name}
                                >
                                    {item.name}
                                </a>
                                : <NavLink
                                    className={classnames(classes.item, 'relative bold')}
                                    onClick={() => setOpen(false)}
                                    key={item.name}
                                    to={item.to}
                                >
                                    {item.name}
                                </NavLink>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}
