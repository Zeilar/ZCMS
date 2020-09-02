import { mdiWhiteBalanceSunny, mdiMoonWaxingCrescent } from '@mdi/js';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import cookie from 'cookie-cutter-helpers';
import Icon from '@mdi/react';

export default function Themetoggler() {
    const styles = createUseStyles({
        icon: {
            'justify-content': 'center',
            'align-items': 'center',
            cursor: 'pointer',
            display: 'flex',
            height: '100%',
            width: '100%',
            '&:hover': {
                animation: 'themeToggler 0.75s linear forwards',
            },
            '&.light': {
                color: 'rgb(207, 176, 0)',
            },
            '&.dark': {
                color: 'white',
            },
        },
    });
    const classes = styles();

    const root = document.querySelector('html');
    const [theme, setTheme] = useState(root.getAttribute('data-theme'));

    function toggleTheme() {
        const whichTheme = theme === 'dark' ? 'light' : 'dark';
        cookie.set('theme', whichTheme, new Date().setFullYear(3000));
        setTheme(whichTheme);
    }

    useEffect(() => {
        root.setAttribute('data-theme', theme);
    }, [theme, setTheme]);

    return (
        <div className={`${classes.icon} ${theme === 'dark' ? 'dark' : 'light'}`} onClick={toggleTheme}>
            <Icon 
                path={theme === 'dark' ? mdiMoonWaxingCrescent : mdiWhiteBalanceSunny}
                color={theme === 'dark' ? 'white' : 'gold'} size={1.5} rotate={25}
            />
        </div>
    );
}