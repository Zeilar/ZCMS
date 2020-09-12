import React, { useState, useRef, useEffect } from 'react';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import { createUseStyles } from 'react-jss';

export default function SubmitButton({ onClick, className, children, spin = true }) {
    const styles = createUseStyles({
        icon: {
            color: 'white !important',
            height: '100%',
            width: '50%',
        },
        button: {
            position: 'relative',
            '&[disabled]': {
                color: 'transparent',
                cursor: 'default',
            },
        },
        filter: {
            background: 'rgba(255, 255, 255, 0.5)',
            'border-radius': 'inherit',
            height: '100%',
            width: '100%',
        },
    });
    const classes = styles();

    const [spinning, setSpinning] = useState(false);

    function startSpin() {
        if (spin) setSpinning(true);
        if (onClick != null) onClick();
    }

    return (
        <button className={`${className} ${classes.button}`} onClick={startSpin} disabled={spinning} type="submit">
            {spinning && spin && <div className={`${classes.filter} centerAbsolute`}></div>}
            {children}
            {spinning && spin && <Icon className={`${classes.icon} centerAbsolute`} path={mdiLoading} spin={1} />}
        </button>
    );
}