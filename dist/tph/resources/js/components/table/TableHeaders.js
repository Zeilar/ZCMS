import { createUseStyles } from 'react-jss';
import React from 'react';

export default function TableHeaders({ className = '', attributes, children }) {
    const styles = createUseStyles({
        headers: {
            overflow: 'hidden',
            display: 'flex',
        },
    });
    const classes = styles();

    return (
        <div className={`${classes.headers} ${className}`} {...attributes}>
            {children}
        </div>
    );
}