import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default function TableHeaders({ items, headers, index }) {
    const styles = createUseStyles({
        headers: {
            'flex-direction': 'row',
            display: 'flex',
        },
    });
    const classes = styles();
    const [indexItems, setIndexItems] = useState([]);
    const [rowIndex, setRowIndex] = useState(0);

    useEffect(() => {
        if (index && items && rowIndex < items.length) {
            for (let i = 1; i <= items.length; i++) {
                setRowIndex(p => p + 1);
                setIndexItems(p => [...p, <TableRow key={Math.random()} value={i} />]);
            }
        }
    });

    return (
        <div className={classes.headers}>
            {
                index &&
                    <TableHeader name="#" index="test">
                        {indexItems}
                    </TableHeader>
            }
            {
                headers.map(header => {
                    return (
                        <TableHeader key={header} name={header}>
                            {items.map(item => <TableRow key={Math.random()} value={item[header]} />)}
                        </TableHeader>
                    );
                })
            }
        </div>
    );
}