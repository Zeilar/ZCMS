import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';

export default function Checkbox({ forwardRef, className, id, ...props }) {
    const styles = createUseStyles({
        box: {
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--body-bg)',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 3,
            display: 'flex',
            height: 25,
            width: 25,
            '&.checked': {
                backgroundImage: 'var(--color-main-gradient)',
                borderColor: 'var(--color-main)',
                '& svg': {
                    display: 'inline-block',
                },
            },
        },
        icon: {
            color: 'var(--color-primary)',
            display: 'none',
        },
    });
    const classes = styles();

    const [checked, setChecked] = useState(false);

    return (
        <>
            <input ref={forwardRef} checked={checked} onChange={e => setChecked(e.target.checked)} hidden type="checkbox" id={id} />
            <button type="button" className={`${classes.box} ${checked ? 'checked' : ''} ${className}`} onClick={() => setChecked(p => !p)} {...props}>
                <Icon className={classes.icon} path={mdiCheck} />
            </button>
        </>
    );
}