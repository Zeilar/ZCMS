import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

export default function LanguageToggler() {
    const styles = createUseStyles({
        wrapper: {
            position: 'relative',
        },
        current: {
            background: 'none',
            display: 'flex',
            height: '40px',
            width: '40px',
        },
        button: {
            'margin-right': '10px',
            background: 'none',
            display: 'flex',
            height: '40px',
            width: '40px',
            '&:hover::after': {
                background: 'rgba(0, 0, 0, 0.25)',
                position: 'absolute',
                display: 'block',
                height: '40px',
                content: '""',
                width: '40px',
                top: 0,
            }
        },
        buttons: {
            'flex-direction': 'row-reverse',
            position: 'absolute',
            cursor: 'pointer',
            display: 'none',
            right: '40px',
            top: 0,
            '&.show': {
                display: 'flex',
            },
        },
    });
    const classes = styles();

    const [locale, setLocale] = useState(document.querySelector('html').getAttribute('lang'));
    const [languages, setLanguages] = useState();
    const [open, setOpen] = useState(false);

    async function getLanguages() {
        const response = await fetch('/languages').then(response => response.json());
        setLanguages(response);
    }

    useEffect(() => {
        if (languages == null) getLanguages();
    }, [languages]);

    return (
        <div className={classes.wrapper} onMouseLeave={() => setOpen(false)}>
            <button className={classes.current} onMouseEnter={() => setOpen(true)}>
                <img src={`/storage/icons/flag-${locale}.png`} />
            </button>
            <div className={`${classes.buttons} ${open ? 'show' : ''}`}>
                {
                    languages && languages.map(language => (
                        language !== locale &&
                            <form action={`/language/${language}`} method="GET" key={language}>
                                <button className={classes.button}>
                                    <img src={`/storage/icons/flag-${language}.png`} />
                                </button>
                            </form>
                    ))
                }
            </div>
        </div>
    );
}