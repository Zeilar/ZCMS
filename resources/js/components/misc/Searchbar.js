import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import classnames from 'classnames';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

export default function Searchbar({ onSubmit, className, placeholder }) {
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
            border: 0,
            '&:focus': {
                boxShadow: 'none',
            },
        },
    });
    const classes = styles();

    const [input, setInput] = useState('');

    return (
        <form className={classnames(classes.bar, className, 'row p-2')} tabIndex={-1} onSubmit={e => onSubmit(e, input)}>
            <input
                className={classnames(classes.input, 'p-0')}
                onChange={e => setInput(e.target.value)}
                placeholder={placeholder ?? 'Aa'}
                value={input}
            />
            <Icon className={classnames('pointer')} path={mdiClose} onClick={() => setInput('')} />
        </form>
    );
}
