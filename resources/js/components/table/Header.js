import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Header({ attributes, children, width, flex }) {
    const styles = createUseStyles({
        header: {
            width: width ?? '',
            flex: flex ?? 1,
            margin: '5px',
        },
    });
    const classes = styles();

    return (
        <div className={classes.header} {...attributes}>
            {children}
        </div>
    );
}