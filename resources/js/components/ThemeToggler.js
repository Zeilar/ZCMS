import { faMoon, faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

export default function Themetoggler() {
    const root = document.querySelector('html');
    const [theme, setTheme] = useState(root.getAttribute('data-theme'));

    useEffect(() => {
        root.setAttribute('data-theme', theme);
    }, [theme, setTheme]);

    return (
        <div className={`togglerIcon ${theme === 'dark' ? 'dark' : 'light'}`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faLightbulb} />
        </div>
    );
}