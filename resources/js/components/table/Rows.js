import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Rows({ attributes, children }) {
    const styles = createUseStyles({
        rows: {
            
        },
    });
    const classes = styles();

    return (
        <div className={classes.rows} {...attributes}>
            {children}
        </div>
    );
}