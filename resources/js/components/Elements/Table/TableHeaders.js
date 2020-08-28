import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { mapKeys } from 'lodash';

export default function TableHeaders({ items, headers }) {
    const styles = createUseStyles({
        headers: {
            'flex-direction': 'row',
            display: 'flex',
        },
    });
    const classes = styles();

    return (
        <div className={classes.headers}>
            {
                headers.map(header => {
                    return (
                        <TableHeader key={header} name={header}>
                            {
                                items.map(item => <TableRow key={Math.random()} value={item[header]} />)
                            }
                        </TableHeader>
                    );
                })
            }
        </div>
    );
}