import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function LanguageToggler() {
    const styles = createUseStyles({
        wrapper: {
            position: 'relative',
            height: '40px',
            width: '40px',
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
        },
        buttons: {
            'flex-direction': 'row-reverse',
            position: 'absolute',
            display: 'flex',
            cursor: 'pointer',
            right: '40px',
            top: 0,
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
                <img src={`/storage/icons/flag-${locale}.png`} alt="Flag"/>
            </button>
            <div className={classes.buttons}>
                {
                    open && languages && languages.map(language => (
                        language !== locale &&
                            <form action={`/language/${language}`} method="GET" key={language}>
                                <button className={classes.button}>
                                    <img src={`/storage/icons/flag-${language}.png`} alt="Flag"/>
                                </button>
                            </form>
                    ))
                }
            </div>
        </div>
    );
}