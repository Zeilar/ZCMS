import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Headers({ attributes, children }) {
    const styles = createUseStyles({
        headers: {
            overflow: 'hidden',
            display: 'flex',
        },
    });
    const classes = styles();

    return (
        <div className={classes.headers} {...attributes}>
            {children}
        </div>
    );
}