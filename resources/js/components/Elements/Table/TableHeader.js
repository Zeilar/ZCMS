import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function TableHeader({ children, name }) {
    const styles = createUseStyles({
        header: {
            'flex-direction': 'column',
            display: 'flex',
        },
        title: {
            'text-transform': 'capitalize',
            'font-weight': 600,
            padding: '0.5rem',
        },
    });
    const classes = styles();

    return (
        <div className={classes.header}>
            <div className={classes.title}>{name}</div>
            <div className={classes.row}>{children}</div>
        </div>
    );
}