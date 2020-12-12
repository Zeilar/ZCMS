import React, { useState, useContext, useEffect } from 'react';
import { FeedbackModalContext } from '../../contexts';
import { createUseStyles } from 'react-jss';
import { MaterialTable } from '../misc';
import { Http } from '../../classes';
import classnames from 'classnames';

export default function Users() {
    const { setMessage } = useContext(FeedbackModalContext);
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const { data, code } = await Http.get('admin/users');
        if (code === 200) {
            setUsers(data);
        } else {
            setMessage('Something went wrong fetching users');
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
