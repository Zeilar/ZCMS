import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import User from './User';

export default function Users({ setHeight }) {
    const [users, setUsers] = useState();
    const usersContainer = useRef();

    async function getUsers() {
        await fetch(`/api/admin/users`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                data = data.map(user => <User key={user.id} user={user} />);
                setUsers(data);
            });
        setHeight(p => p + usersContainer.current.getBoundingClientRect().height);
    }

    useEffect(() => {
        if (users == null) getUsers();
    }, [users, getUsers, setUsers, usersContainer, setHeight]);

    return (
        <div ref={usersContainer}>
            {users}
        </div>
    );
}