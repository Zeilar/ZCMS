import React, { useState, useRef, useEffect } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

export default function NavDropdown({ toggler, items = [], align = 'right' }) {
    const styles = createUseStyles({
        wrapper: {

        },
        toggler: {
            background: 'none',
            border: 0,
        },
        listWrapper: {
            background: 'none',
            paddingTop: 15,
            '&.right': {
                right: 0,
            },
        },
        list: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            background: 'none',
        },
        item: {
            backgroundColor: 'var(--color-primary)',
            padding: [10, 20],
            '&:hover': {
                textDecoration: 'none',
            },
            '&:first-child': {
                borderTopRightRadius: 2,
                borderTopLeftRadius: 2,
            },
            '&:last-child': {
                borderBottomRightRadius: 2,
                borderBottomLeftRadius: 2,
            },
        },
    });
    const classes = styles();

    const [open, setOpen] = useState(false);

    const wrapper = useOnclickOutside(() => {
        setOpen(false);
    });

    return (
        <div className={classnames(classes.wrapper, 'relative')} ref={wrapper} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button className={classnames(classes.toggler, 'center-children')} onClick={() => setOpen(p => !p)}>
                {toggler}
            </button>
            <div className={classnames(classes.listWrapper, { right: align === 'right' }, 'absolute')}>
                <ul className={classnames(classes.list, 'col')}>
                    {
                        open && items.length > 0 && items.map(item => (
                            <NavLink className={classnames(classes.item)} to={item.to} key={item.name} onClick={() => setOpen(false)}>
                                {item.name}
                            </NavLink>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}
