import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function TableRow({ value }) {
    const styles = createUseStyles({
        row: {
            'border-bottom': '1px solid var(--border-primary)',
            'flex-direction': 'row',
            display: 'flex',
        },
    });
    const classes = styles();

    return (
        <div className={classes.row}>
            {value}
        </div>
    );
}