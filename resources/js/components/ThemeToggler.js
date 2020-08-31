import { faMoon, faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

export default function Themetoggler() {
    const root = document.querySelector('html');
    const [theme, setTheme] = useState(root.getAttribute('data-theme'));

    function toggleTheme() {
        const whichTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', whichTheme);
        setTheme(whichTheme);
    }

    useEffect(() => {
        root.setAttribute('data-theme', theme);
    }, [theme, setTheme]);

    return (
        <div className={`togglerIcon ${theme === 'dark' ? 'dark' : 'light'}`} onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faLightbulb} />
        </div>
    );
}