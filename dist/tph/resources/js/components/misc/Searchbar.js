import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import classnames from 'classnames';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

export default function Searchbar({ defaultValue, onSubmit, className, placeholder }) {
    const styles = createUseStyles({
        bar: {
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.05s linear',
            borderRadius: 4,
            '&:focus-within': {
                boxShadow: [0, 0, 0, 1, 'var(--color-main)'],
                borderColor: 'var(--color-main)',
            },
        },
        input: {
            backgroundColor: 'transparent',
            fontSize: '1.5rem',
            border: 0,
            '&:focus': {
                boxShadow: 'none',
            },
        },
        icon: {
            color: 'var(--text-secondary)',
            width: '1.5rem',
        },
    });
    const classes = styles();

    const [input, setInput] = useState(defaultValue ?? '');

    return (
        <form className={classnames(classes.bar, className, 'row')} tabIndex={-1} onSubmit={e => onSubmit(e, input)}>
            <input
                className={classnames(classes.input, 'p-2')}
                onChange={e => setInput(e.target.value)}
                placeholder={placeholder ?? 'Aa'}
                value={input}
                type="text"
            />
            {input !== '' && <Icon className={classnames(classes.icon, 'pointer mr-2')} path={mdiClose} onClick={() => setInput('')} />}
        </form>
    );
}
