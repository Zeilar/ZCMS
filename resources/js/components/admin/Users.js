import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { MaterialTable } from '../misc';
import { Http } from '../../classes';
import classnames from 'classnames';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const { data, code } = await Http.get('admin/users');
        if (code === 200) {
            setUsers(data);
        }
    }, []);

    return (
        <div>
            <MaterialTable
                columns={[
                    { title: 'Username', field: 'username' },
                    { title: 'Email', field: 'email' },
                ]}
                options={{
                    selection: true,
                    pageSize: 10,
                }}
                data={users}
                title="Users"
            />
        </div>
    );
}
