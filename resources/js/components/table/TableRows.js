import { createUseStyles } from 'react-jss';
import React from 'react';

export default function TableRows({ className = '', attributes, children }) {
    const styles = createUseStyles({
        rows: {
            
        },
    });
    const classes = styles();

    return (
        <div className={`${classes.rows} ${className}`} {...attributes}>
            {children}
        </div>
    );
}