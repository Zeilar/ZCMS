import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function TableRows({ className = '', attributes, children }) {
    const styles = createUseStyles({
        row: {
            overflow: 'hidden',
            display: 'flex',
        },
    });
    const classes = styles();

    return (
        <div className={`${classes.row} ${className}`} {...attributes}>
            {children}
        </div>
    );
}