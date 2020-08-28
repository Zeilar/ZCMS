import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function TableHeader({ children, name }) {
    const styles = createUseStyles({
        header: {
            'flex-direction': 'column',
            display: 'flex',
            border: '1px solid blue',
        },
        title: {

        },
        row: {

        },
    });
    const classes = styles();

    useEffect(() => {
        
    });

    return (
        <div className={classes.header}>
            <div className={classes.title}>{name}</div>
            <div className={classes.row}>{children}</div>
        </div>
    );
}