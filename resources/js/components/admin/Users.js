import React, { useState, useContext, useEffect } from 'react';
import { FeedbackModalContext } from '../../contexts';
import { mdiPencil, mdiTrashCan } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import { MaterialTable } from '../misc';
import { Http } from '../../classes';
import classnames from 'classnames';
import Icon from '@mdi/react';
import { errorCodeHandler } from '../../functions/helpers';

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

    async function deleteUser(id) {
        const { code } = await Http.delete(`admin/users/${id}`);
        errorCodeHandler(code, message => setMessage(message), () => setUsers(p => p.filter(user => user.id !== id)));
    }

    return (
        <div>
            <MaterialTable
                columns={[
                    { title: 'Username', field: 'username' },
                    { title: 'Email', field: 'email' },
                ]}
                options={{
                    // selection: true,
                    pageSize: 10,
                }}
                data={users}
                actions={[
                    {
                        icon: () => <Icon path={mdiPencil} />,
                        tooltip: 'Edit user',
                        onClick: (e, rowData) => {
                            
                        },
                    },
                    {
                        icon: () => <Icon className={classnames('color-danger')} path={mdiTrashCan} />,
                        tooltip: 'Delete user',
                        onClick: (e, rowData) => {
                            if (!confirm(`Are you sure you want to delete user ${rowData.username}?`)) {
                                return;
                            }
                            deleteUser(rowData.id);
                        },
                    },
                ]}
                title="Users"
            />
        </div>
    );
}
