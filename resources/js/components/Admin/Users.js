import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import User from './User';

export default function Users({ users, setUsers }) {
    async function getUsers() {
        await fetch(`/api/admin/users`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (!users) {
                    data = data.map(user => <User key={user.id} user={user} />);
                    setUsers(data);
                }
            });
    }

    useEffect(() => {
        if (users == null) getUsers();
    }, [users, getUsers]);

    return (
        <div>
            {users}
        </div>
    );
}