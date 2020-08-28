import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import User from './User';

export default function Users() {
    const styles = createUseStyles({
        users: {

        },
    });
    const classes = styles();

    const [users, setUsers] = useState();
    const usersContainer = useRef();

    async function getUsers() {
        await fetch(`/api/admin/users`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                data = data.map(user => <User key={user.id} user={user} />);
                setUsers(data);
            });
    }

    useEffect(() => {
        if (users == null) getUsers();
    }, [users, getUsers, setUsers, usersContainer]);

    return (
        <div className={`${classes.users} scrollbar`} ref={usersContainer}>
            {users}
        </div>
    );
}