import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { mdiArrowUp } from '@mdi/js';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function ScrollToTop() {
    const styles = createUseStyles({
        button: {
            backgroundImage: 'var(--color-main-gradient)',
            transition: 'all 0.15s linear',
            bottom: 35,
            height: 50,
            width: 50,
            right: 35,
            '&.hidden': {
                pointerEvents: 'none',
                opacity: 0,
            },
            '@media (max-width: 1200px)': {
                display: 'none',
            },
        },
        icon: {
            color: 'var(--color-primary)',
        },
    });
    const classes = styles();

    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', () => setHidden(window.scrollY > window.innerHeight * 1.5 ? false : true));
    }, []);

    return (
        <button className={classnames(classes.button, { hidden: hidden }, 'btn p-2 center-children fixed')} onClick={() => window.scrollTo(0, 0)}>
            <Icon className={classnames(classes.icon)} path={mdiArrowUp} />
        </button>
    );
}