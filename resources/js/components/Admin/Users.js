import React, { useState, useRef, useEffect, useCallback } from 'react';
import TableHeaders from '../Elements/Table/TableHeaders';
import TableHeader from '../Elements/Table/TableHeader';
import TableRows from '../Elements/Table/TableRows';
import TableRow from '../Elements/Table/TableRow';
import { createUseStyles } from 'react-jss';
import Table from '../Elements/Table/Table';
import User from './User';

export default function Users() {
    const styles = createUseStyles({
        users: {

        },
    });
    const classes = styles();

    const [users, setUsers] = useState();

    async function getUsers() {
        await fetch(`/api/admin/users`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setUsers(data));
    }

    useEffect(() => {
        if (users == null) getUsers();
    }, [users, getUsers, setUsers]);

    return (
        <div className={`${classes.users} scrollbar`}>
            <Table ignore={['created_at', 'updated_at']} blueprint={users && users[0]}>
                {users}
            </Table>
        </div>
    );
}