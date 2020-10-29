import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Table({ className = '', attributes, children, width }) {
    const styles = createUseStyles({
        table: {
            flexDirection: 'column',
            width: width ?? '',
            display: 'flex',
        },
    });
    const classes = styles();

    return (
        <div className={`${classes.table} ${className}`} {...attributes}>
            {children}
        </div>
    );
}