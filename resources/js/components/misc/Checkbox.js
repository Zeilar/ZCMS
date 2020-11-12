import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import classnames from 'classnames';
import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';

export default function Checkbox({ forwardRef, className, id, ...props }) {
    const styles = createUseStyles({
        box: {
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-body)',
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
            <button
                className={classnames(classes.box, { checked: checked }, className, 'outline')}
                onClick={() => setChecked(p => !p)}
                type="button"
                {...props}
            >
                <Icon className={classnames(classes.icon)} path={mdiCheck} />
            </button>
        </>
    );
}
