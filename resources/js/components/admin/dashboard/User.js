import { mdiTrashCan, mdiSquareEditOutline, mdiCheck, mdiCancel, mdiShieldCheck } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import Tags from "@yaireo/tagify/dist/react.tagify";
import SubmitButton from '../../SubmitButton';
import { createUseStyles } from 'react-jss';
import Icon from '@mdi/react';

export default function User({ id, username, email, roles, suspended, setUsers, checkboxes, setCheckboxes }) {
    const styles = createUseStyles({
        td: {
            'border-top': '1px solid rgb(225, 225, 225)',
            padding: '8px 15px',
            '&.actions': {
                display: 'flex',
            },
            '&.edit, &.suspend': {
                border: 0,
            },
            '&.suspend': {
                'align-items': 'center',
                display: 'flex',
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
        suspendInputs: {
            'margin-right': '10px',
        },
        suspendInput: {
            'margin-top': '5px',
        },
        suspendInputText: {
            
        },
    });
    const classes = styles();

    const [suspending, setSuspending] = useState(false);
    const [editing, setEditing] = useState(false);
    const [checked, setChecked] = useState(false);
    const inputUsername = useRef();
    const inputMessage = useRef();
    const inputEmail = useRef();
    const inputRoles = useRef();
    const inputDays = useRef();

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

    async function suspend() {
        const args = {
            method: 'POST',
            body: {
                message: inputMessage.current.value,
                days: inputDays.current.value,
            }
        }
        await fetch(`/admin/users/${id}/suspend`, args)
            .then(response => response.json())
            .then(users => setUsers(users))
            .catch(error => alert(error));

        setSuspending(false);
    }

    async function pardon() {
        await fetch(`/admin/users/${id}/pardon`, { method: 'POST' })
            .then(response => response.json())
            .then(users => setUsers(users))
            .catch(error => alert(error));
    }

    function close() {
        setSuspending(false);
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
                        editing &&
                            <SubmitButton className="btnDashboard" onClick={save}>
                                <Icon className={classes.icon} path={mdiCheck} />
                                <span>Save</span>
                            </SubmitButton>
                    }
                    {
                        suspending &&
                            <SubmitButton className="btnDashboard" onClick={suspend}>
                                <Icon className={classes.icon} path={mdiCheck} />
                                <span>Suspend</span>
                            </SubmitButton>
                    }
                    {
                        !editing && !suspending &&
                            <>
                                <button className="btnDashboard" onClick={() => setEditing(true)}>
                                    <Icon className={classes.icon} path={mdiSquareEditOutline} />
                                    <span>Edit</span>
                                </button>
                                {
                                    suspended
                                        ? <SubmitButton className="btnDashboard suspend" onClick={pardon}>
                                            <Icon className={classes.icon} path={mdiShieldCheck} />
                                            <span>Pardon</span>
                                        </SubmitButton>
                                        : <button className="btnDashboard suspend" onClick={() => setSuspending(true)}>
                                            <Icon className={classes.icon} path={mdiCancel} />
                                            <span>Suspend</span>
                                        </button>
                                }
                                <button className="btnDashboard delete" onClick={remove}>
                                    <Icon className={classes.icon} path={mdiTrashCan} />
                                    <span>Delete</span>
                                </button>
                            </>
                    }
                    {
                        (editing || suspending) &&
                            <span className={classes.cancel} onClick={close}>
                                Cancel
                            </span>
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
            {
                suspending &&
                    <tr>
                        <td className={`${classes.td} suspend`}>
                            <div className={classes.suspendInputs}>
                                <span className={classes.suspendInputText}>Amount of days</span>
                                <input className={classes.suspendInput} ref={inputDays} type="number" min={1} />
                            </div>
                            <div className={classes.suspendInputs}>
                                <span className={classes.suspendInputText}>Reason</span>
                                <input className={classes.suspendInput} ref={inputMessage} type="text" />
                            </div>
                        </td>
                    </tr>
            }
        </>
    );
}