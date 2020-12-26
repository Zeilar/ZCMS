import { createUseStyles } from 'react-jss';
import React from 'react';

export default function TableCell({ className = '', attributes, children, width, flex }) {
    const styles = createUseStyles({
        cell: {
            overflow: 'hidden',
            width: width ?? '',
            flex: flex ?? 1,
            margin: 5,
        },
    });
    const classes = styles();

    return (
        <div className={`${classes.cell} ${className}`} {...attributes}>
            {children}
        </div>
    );
}