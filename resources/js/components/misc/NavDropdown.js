import useOnclickOutside from 'react-cool-onclickoutside';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

export default function NavDropdown({ containerClassName = '', toggler, items = [], align = 'right' }) {
    const styles = createUseStyles({
        wrapper: {
            marginRight: 50,
            '&.right': {
                marginRight: 0,
                marginLeft: 50,
            },
            '@media (max-width: 768px)': {
                transition: 'all 0.25s',
                position: 'relative',
                marginRight: 15,
                '&.right': {
                    marginRight: 0,
                    marginLeft: 15,
                },
            },
        },
        toggler: {
            fontSize: '1.25rem',
            background: 'none',
            border: 0,
        },
        mobileClose: {
            color: 'var(--color-primary)',
            position: 'absolute',
            background: 'none',
            display: 'none',
            border: 0,
            right: 20,
            top: 20,
            '& svg': {
                width: 35,
            },
            '&.show': {
                '@media (max-width: 768px)': {
                    display: 'flex',
                    '&:hover': {
                        color: 'var(--color-main)',
                    },
                },
            },
        },
        listWrapper: {
            transform: 'translateX(-50%)',
            position: 'absolute',
            paddingTop: 10,
            left: '50%',
            zIndex: 10,
            '@media (max-width: 768px)': {
                backgroundColor: 'var(--color-dark)',
                transition: 'all 0.25s ease-in-out',
                transform: 'none',
                position: 'fixed',
                display: 'flex',
                height: '100vh',
                width: '100vw',
                paddingTop: 0,
                top: '-100%',
                left: 0,
                '&.open': {
                    top: 0,
                },
            },
        },
        list: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            borderRadius: 4,
            '@media (max-width: 768px)': {
                boxShadow: 'none',
                margin: 'auto',
                gap: '20px',
            },
        },
        item: {
            borderTop: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--text-primary)',
            fontFamily: 'TitilliumWeb',
            textAlign: 'center',
            transition: 'none',
            padding: [15, 35],
            '&:hover': {
                backgroundImage: 'var(--color-main-gradient)',
                color: 'var(--color-primary)',
                borderColor: 'transparent',
                textDecoration: 'none',
            },
            '@media (max-width: 768px)': {
                background: 'none !important',
                color: 'var(--color-primary)',
                fontSize: '1.5rem',
                borderRadius: 0,
                border: 0,
                '&:hover': {
                    color: 'var(--color-main)',
                },
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

    useEffect(() => {
        const body = document.querySelector('body');
        if (window.innerWidth <= 768 && open) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'visible';
        }
    }, [open]);

    return (
        <div className={classnames(classes.wrapper, 'p-2 no-select', align, containerClassName)} ref={wrapper}>
            <button className={classnames(classes.toggler, 'color-main center-children bold')} onClick={() => setOpen(p => !p)}>
                {toggler}
            </button>
            <div className={classnames(classes.listWrapper, { open: open })}>
                <button className={classnames(classes.mobileClose, { show: open })} onClick={() => setOpen(false)}>
                    <Icon path={mdiClose} />
                </button>
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
