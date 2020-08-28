import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function TableRow({ value }) {
    const styles = createUseStyles({
        row: {
            'flex-direction': 'row',
            display: 'flex',
            border: '1px solid red',
        },
    });
    const classes = styles();

    // console.log(value);

    return (
        <div className={classes.row}>
            {value}
        </div>
    );
}