import { mdiTrashCan, mdiSquareEditOutline, mdiCheck } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import Tags from "@yaireo/tagify/dist/react.tagify";
import SubmitButton from '../../SubmitButton';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function User({ id, username, email, roles, setUsers, checkboxes, setCheckboxes }) {
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
            'margin-right': '2px',
            height: '20px',
            width: '20px',
        },
        cancel: {
            'align-self': 'center',
            cursor: 'pointer',
            '&:hover': {
                'text-decoration': 'underline',
            },
        },
        input: {
            width: '100%',
        },
        role: {
            'margin-right': '5px',
            '&::after': {
                content: '","',
            },
            '&:last-child::after': {
                content: 'none',
            },
        },
    });
    const classes = styles();

    const [editing, setEditing] = useState(false);
    const [checked, setChecked] = useState(false);
    const inputUsername = useRef();
    const inputEmail = useRef();
    const inputRoles = useRef();

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
        const roles = JSON.stringify(inputRoles.current.value);
        await fetch(`/admin/users/${id}?username=${inputUsername.current.value}&email=${inputEmail.current.value}&roles=${roles}`, { method: 'PATCH' })
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
            setCheckboxes(p => [...p, id]);
            setChecked(true);
        } else {
            setCheckboxes(p => {
                const newArray = p;
                newArray.splice(index, 1);
                return newArray;
            });
            setChecked(false);
        }
    }

    useEffect(() => {
        const index = checkboxes.indexOf(id);
        setChecked(index === -1 ? false : true);
    }, [checkboxes, setCheckboxes, id]);

    return (
        <>
            <tr className={classes.tr}>
                <td className={classes.td}>
                    <input type="checkbox" onChange={toggleCheckbox} checked={checked} />
                </td>
                <td className={classes.td}>{id}</td>
                <td className={classes.td}>{username}</td>
                <td className={classes.td}>{email}</td>
                <td className={classes.td}>
                    {
                        roles.map(role => (
                            <span className={classes.role} key={Math.random()}>
                                {role.name}
                            </span>
                        ))
                    }
                </td>
                <td className={`${classes.td} actions`}>
                    {
                        editing
                            ? <>
                                <SubmitButton className="btnDashboard" onClick={save}>
                                    <Icon className={classes.icon} path={mdiCheck} />
                                    <span>Save</span>
                                </SubmitButton>
                                <span className={classes.cancel} onClick={() => setEditing(false)}>
                                    Cancel
                                </span>
                            </>
                            : <>
                                <button className="btnDashboard" onClick={() => setEditing(true)}>
                                    <Icon className={classes.icon} path={mdiSquareEditOutline} />
                                    <span>Edit</span>
                                </button>
                                <button className="btnDashboard delete" onClick={remove}>
                                    <Icon className={classes.icon} path={mdiTrashCan} />
                                    <span>Delete</span>
                                </button>
                            </>
                    }
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
                            <input className={classes.input} type="text" ref={inputUsername} defaultValue={username} />
                        </td>
                        <td className={`${classes.td} edit`}>
                            <input className={classes.input} type="email" ref={inputEmail} defaultValue={email} />
                        </td>
                        <td className={`${classes.td} edit`}>
                            <Tags tagifyRef={inputRoles} value={roles.map(role => role.name)} />
                        </td>
                        <td className={`${classes.td} edit`}></td>
                    </tr>
            }
        </>
    );
}