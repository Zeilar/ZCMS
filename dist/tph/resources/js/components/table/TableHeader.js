import { createUseStyles } from 'react-jss';
import React from 'react';

export default function TableHeader({ className = '', attributes, children, width, flex }) {
    const styles = createUseStyles({
        header: {
            width: width ?? '',
            flex: flex ?? 1,
            margin: 5,
        },
    });
    const classes = styles();

    return (
        <div className={`${classes.header} ${className}`} {...attributes}>
            {children}
        </div>
    );
}