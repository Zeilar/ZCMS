import { faTimes, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Users from './Users';
import Home from './Home';

export default function AdminDashboard({ user, open, setOpen }) {
    const styles = createUseStyles({
        dashboard: {
            transition: 'transform 0.25s linear',
            background: 'var(--color-primary)',
            transform: 'translateY(-100%)',
            overflow: 'hidden',
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            left: 0,
            top: 0,
            '&.open': {
                transform: 'translateY(0)',
            },
        },
        banner: {
            'box-shadow': '0 0 10px 2px rgba(0, 0, 0, 0.25)',
            background: 'var(--color-secondary)',
            'align-items': 'center',
            display: 'flex',
            height: '2rem',
            color: 'white',
        },
        bannerContent: {
            padding: '0.5rem',
        },
        close: {
            background: 'rgb(50, 50, 50)',
            'justify-content': 'center',
            'align-items': 'center',
            'margin-left': 'auto',
            display: 'flex',
            height: '2rem',
            width: '2rem',
        },
        circle: {
            'font-size': '1.25rem',
            color: 'white',
        },
        wrapper: {
            display: 'flex',
            height: '100%',
        },
        sidebar: {
            'box-shadow': '0 0 10px 2px rgba(0, 0, 0, 0.25)',
            background: 'var(--body-bg)',
            width: '15vw',
        },
        sidebarUser: {
            'justify-content': 'center',
            'flex-direction': 'column',
            'align-items': 'center',
            position: 'relative',
            display: 'flex',
            height: '100px',
        },
        hr: {
            border: 0,
            'border-image': 'linear-gradient(to left, transparent 1%, rgba(0, 0, 0, 0.5) 50%, transparent 100%) 1',
            'border-bottom': '1px solid',
            position: 'absolute',
            width: '75%',
            bottom: 0,
        },
        content: {
            overflow: 'auto',
            display: 'flex',
            padding: '1rem',
            flex: 1,
        },
        sidebarList: {
            padding: '1rem 0',
        },
        sidebarItem: {
            transition: 'background 0.15s ease-in-out',
            'border-left': '4px solid transparent',
            color: 'var(--text-secondary)',
            'align-items': 'center',
            padding: '0.75rem 1rem',
            'user-select': 'none',
            cursor: 'pointer',
            display: 'flex',
            '&:hover': {
                background: 'var(--color-primary)',
                color: 'var(--text-primary)',
            },
            '&.active': {
                'border-color': 'var(--color-secondary)',
                color: 'var(--color-secondary)',
            },
        },
        sidebarItemIcon: {
            'margin-right': '0.5rem',
        },
        sidebarItemText: {
         
        },
    });
    const classes = styles();

    const [activeItem, setActiveItem] = useState(home);
    const users = useRef();
    const home = useRef();

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') setOpen(false);
    });

    useEffect(() => {
        if (activeItem == null) setActiveItem(home);
    });

    return (
        <section className={`${classes.dashboard} ${open ? 'open' : ''}`}>
            <div className={classes.banner}>
                <div className={classes.bannerContent}>
                    <span className={classes.title}>ZCMS Admin</span>
                </div>
                <button className={classes.close} onClick={() => setOpen(false)}>
                    <FontAwesomeIcon className={classes.circle} icon={faTimes} />
                </button>
            </div>
            <div className={classes.wrapper}>
                <div className={classes.sidebar}>
                    <div className={classes.sidebarUser}>
                        <p>{user.username}</p>
                        <hr className={classes.hr} />
                    </div>
                    <ul className={classes.sidebarList}>
                        <li className={`${classes.sidebarItem} ${activeItem && activeItem === home ? 'active' : ''}`} ref={home} onClick={() => setActiveItem(home)}>
                            <FontAwesomeIcon className={classes.sidebarItemIcon} icon={faHome} />
                            <span className={classes.sidebarItemText}>Home</span>
                        </li>
                        <li className={`${classes.sidebarItem} ${activeItem && activeItem === users ? 'active' : ''}`} ref={users} onClick={() => setActiveItem(users)}>
                            <FontAwesomeIcon className={classes.sidebarItemIcon} icon={faUsers} />
                            <span className={classes.sidebarItemText}>Users</span>
                        </li>
                    </ul>
                </div>
                <div className={classes.content}>
                    {activeItem === home && <Home />}
                    {activeItem === users && <Users />}
                </div>
            </div>
        </section>
    );
}