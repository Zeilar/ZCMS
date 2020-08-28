import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import TableHeaders from './TableHeaders';
import TableHeader from './TableHeader';

export default function Table({ children, ignore }) {
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
            const parameters = children[0];

            if (ignore) {
                ignore.forEach(element => {
                    delete parameters[element];
                });
            }

            if (tableHeaders.length < Object.keys(parameters).length) {
                for (const key in parameters) {
                    setTableHeaders(p => [...p, key]);
                }
            }
        }
    }, [children, ignore, tableHeaders, setTableHeaders]);

    return (
        <div className={classes.table}>
            <TableHeaders items={children} headers={tableHeaders} />
        </div>
    );
}