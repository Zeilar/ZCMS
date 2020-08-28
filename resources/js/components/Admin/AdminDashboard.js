import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import Users from './Users';

export default function AdminDashboard({ open }) {
    const styles = createUseStyles({
        dashboard: {
            transition: 'height 0.15s linear',
            overflow: 'hidden',
        },
    });
    const classes = styles();

    const [height, setHeight] = useState(0);
    const dashboard = useRef();

    useEffect(() => {

    }, [open]);

    return (
        <div className={classes.dashboard} ref={dashboard} style={{ height: open ? height : 0 }}>
            Admin Dashboard

            <Users setHeight={setHeight} />
        </div>
    );
}