import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Table({ attributes, children, width }) {
    const styles = createUseStyles({
        table: {
            'flex-direction': 'column',
            height: 'fit-content',
            width: width ?? '',
            display: 'flex',

            background: 'red',
        },
    });
    const classes = styles();

    return (
        <div className={classes.table} {...attributes}>
            {children}
        </div>
    );
}