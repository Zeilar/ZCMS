import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function TableRows({ children }) {
    const styles = createUseStyles({
        rows: {
            'flex-direction': 'row',
            display: 'flex',
        },
    });
    const classes = styles();

    return (
        <div className={classes.rows}>
            {children}
        </div>
    );
}