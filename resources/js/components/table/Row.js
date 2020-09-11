import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function Rows({ attributes, children, itemData }) {
    const styles = createUseStyles({
        row: {
            overflow: 'hidden',
            display: 'flex',
        },
    });
    const classes = styles();

    const [item, setItem] = useState(itemData);

    return (
        <div className={classes.row} {...attributes}>
            {children}
        </div>
    );
}