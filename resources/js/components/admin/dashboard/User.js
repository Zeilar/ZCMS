import { mdiTrashCan, mdiSquareEditOutline } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import SubmitButton from '../../SubmitButton';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function User({ id, username, email, setUsers, checkboxes, setCheckboxes }) {
    const styles = createUseStyles({
        td: {
            'border-top': '1px solid rgb(225, 225, 225)',
            padding: '8px 15px',
            '&.actions': {
                display: 'flex',
            },
            '&.edit': {
                border: 0,
            },
        },
        tr: {
            '&:nth-child(odd)': {
                background: 'rgb(250, 250, 250)',
            },
        },
        icon: {
            height: '20px',
            width: '20px',
        },
    });
    const classes = styles();

    const [editing, setEditing] = useState(false);
    const inputUsername = useRef();
    const inputEmail = useRef();

    async function remove() {
        const answer = confirm(`Are you sure you want to delete user ${username}?`);

        if (answer) {
            await fetch(`/admin/users/${id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(users => setUsers(users))
                .catch(error => alert(error));
        }
    }

    async function save() {
        await fetch(`/admin/users/${id}?username=${inputUsername.current.value}&email=${inputEmail.current.value}`, { method: 'PATCH' })
            .then(response => response.json())
            .then(({ message, type, users }) => {
                setUsers(users);
            })
            .catch(error => alert(error));

        setEditing(false);
    }

    function toggleCheckbox() {
        const index = checkboxes.indexOf(id);
        if (index === -1) {
            console.log('doesnt exist, push');
            setCheckboxes(p => [...p, id]);
        } else {
            console.log('exists, remove', index, checkboxes[index]);

            setCheckboxes(p => [...p.splice(index, 1)]);
        }
    }

    useEffect(() => {
        // const index = checkboxes.indexOf(id);
        // setChecked(index === -1 ? false : true);
        // if (index === -1) {
        //     setCheckboxes(p => [...checkboxes, id]);
        // }
    }, [ checkboxes, setCheckboxes, id]);

    return (
        <>
            <tr className={classes.tr}>
                <td className={classes.td}>
                    <input type="checkbox" onChange={toggleCheckbox} />
                </td>
                <td className={classes.td}>{id}</td>
                <td className={classes.td}>{username}</td>
                <td className={classes.td}>{email}</td>
                <td className={`${classes.td} actions`}>
                    <button className="btnDashboard" onClick={() => setEditing(true)}>
                        <Icon className={classes.icon} path={mdiSquareEditOutline} />
                        <span>Edit</span>
                    </button>
                    <button className="btnDashboard delete" onClick={remove}>
                        <Icon className={classes.icon} path={mdiTrashCan} />
                        <span>Delete</span>
                    </button>
                </td>
            </tr>
            {
                editing &&
                    <tr>
                        <td className={`${classes.td} edit`}></td>
                        <td className={`${classes.td} edit`}>
                            {id}
                        </td>
                        <td className={`${classes.td} edit`}>
                            <input type="text" ref={inputUsername} defaultValue={username} />
                        </td>
                        <td className={`${classes.td} edit`}>
                            <input type="email" ref={inputEmail} defaultValue={email} />
                        </td>
                        <td className={`${classes.td} edit actions`}>
                            <SubmitButton className="btnDashboard" onClick={save}>
                                Save
                            </SubmitButton>
                            <button className="btnDashboard" onClick={() => setEditing(false)}>
                                Cancel
                            </button>
                        </td>
                    </tr>
            }
        </>
    );
}