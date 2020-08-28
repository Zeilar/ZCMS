import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import TableHeaders from './TableHeaders';
import TableHeader from './TableHeader';

export default function Table({ children, ignore, blueprint, index }) {
    const styles = createUseStyles({
        table: {
            'flex-direction': 'column',
            display: 'flex',
        },
    });
    const classes = styles();

    const [tableHeaders, setTableHeaders] = useState([]);

    useEffect(() => {
        if (children) {
            if (ignore) {
                ignore.forEach(element => {
                    delete blueprint[element];
                });
            }

            if (tableHeaders.length < Object.keys(blueprint).length) {
                for (const key in blueprint) {
                    setTableHeaders(p => [...p, key]);
                }
            }
        }
    }, [children, ignore, tableHeaders, setTableHeaders]);

    return (
        <div className={classes.table}>
            <TableHeaders index={index} items={children} headers={tableHeaders} />
        </div>
    );
}