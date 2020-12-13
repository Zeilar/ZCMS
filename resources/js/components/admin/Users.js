import React, { useState, useContext, useEffect } from 'react';
import { errorCodeHandler } from '../../functions/helpers';
import { mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js';
import { FeedbackModalContext } from '../../contexts';
import { CrudModal, CrudField, CrudTags } from './';
import { createUseStyles } from 'react-jss';
import { MaterialTable } from '../misc';
import { Http } from '../../classes';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function Users() {
    const { setMessage } = useContext(FeedbackModalContext);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

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

    async function updateUser(id) {
        
    }

    return (
        <div>
            <MaterialTable
                columns={[
                    { title: 'Username', field: 'username' },
                    { title: 'Email', field: 'email' },
                ]}
                options={{
                    pageSize: 10,
                }}
                data={users}
                actions={[
                    {
                        icon: () => <Icon path={mdiPlus} />,
                        tooltip: 'Add user',
                        onClick: () => {
                            setAddModalOpen(true);
                        },
                        isFreeAction: true,
                    },
                    {
                        icon: () => <Icon path={mdiPencil} />,
                        tooltip: 'Edit user',
                        onClick: (e, rowData) => {
                            setEditModalOpen(true);
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
            <CrudModal
                fields={[
                    { title: 'Username', name: 'username', value: '' },
                    { title: 'Email', name: 'email', value: '' },
                ]}
                render={(fields, update) => {
                    return (
                        <>
                            <CrudField field={fields.find(field => field.title === 'Username')} update={update} />
                            <CrudField field={fields.find(field => field.title === 'Email')} update={update} />
                        </>
                    );
                }}
            />
        </div>
    );
}
