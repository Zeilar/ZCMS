import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Cell({ attributes, children, width, flex }) {
    const styles = createUseStyles({
        cell: {
            overflow: 'hidden',
            width: width ?? '',
            flex: flex ?? 1,
            margin: '5px',
        },
    });
    const classes = styles();

    return (
        <div className={classes.cell} {...attributes}>
            {children}
        </div>
    );
}