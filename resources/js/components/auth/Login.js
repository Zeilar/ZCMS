import { UserContext } from '../../contexts/UserContext';
import { Redirect, useHistory } from 'react-router';
import React, { useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import Tooltip from '../misc/Tooltip';
import Http from '../../classes/Http';
import { mdiLoading } from '@mdi/js';
import Header from '../Header';
import Icon from '@mdi/react';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    if (user) return <Redirect to={{ pathname: '/', state: { error: 'You are already logged in' } }} />

    const styles = createUseStyles({
        login: {
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 3,
            width: '20%',
        },
        input: {
            border: '1px solid var(--border-secondary)',
            backgroundColor: 'transparent',
            transition: 'all 0.1s linear',
            fontSize: '1.25rem',
            borderRadius: 3,
            padding: 8,
            '&:focus': {
                boxShadow: [0, 0, 0, 1, 'var(--color-main)'],
                border: '1px solid var(--color-main)',
            },
        },
        row: {
            padding: 35,
        },
        label: {
            color: 'var(--border-secondary)',
        },
        footer: {
            borderTop: '1px solid var(--border-primary)',
            backgroundColor: 'var(--body-bg)',
            padding: 35,
        },
        submit: {
            boxShadow: [0, 0, 10, 1, 'rgba(0, 0, 0, 0.15)'],
            fontSize: '1.25rem',
            borderRadius: 3,
        },
        submitIcon: {
            color: 'var(--color-primary)',
            height: 25,
        },
        submitText: {
            height: 25,
        },
    });
    const classes = styles();

    const [submitting, setSubmitting] = useState(false);
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const history = useHistory();

    async function login(e) {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);

        const response = await Http.post('login', { body: formData }, true);
        setSubmitting(false);
        if (response.code === 200) {
            history.push('/');
            setUser(response.data);
        } else {
            alert('Error');
        }
    }

    return (
        <>
            <Header />
            <h2 className={classes.header}>Login</h2>
            <form className={`${classes.login} mx-auto mt-5`} onSubmit={login}>
                <div className={`${classes.row} pb-0 col`}>
                    <label className={classes.label}>Username or Email</label>
                    <input className={`${classes.input} mt-1`} value={id} onChange={(e) => setId(e.target.value)} id="id" />
                </div>
                <div className={`${classes.row} col`}>
                    <label className={classes.label}>Password</label>
                    <input
                        className={`${classes.input} mt-1`} id="password" type="password"
                        onChange={(e) => setPassword(e.target.value)} value={password} 
                    />
                </div>
                <div className={`${classes.footer}`}>
                    <Tooltip
                        disabled={submitting || !id || !password} title={!id || !password ? 'Please fill all the fields' : null} tagName="button"
                        className={`${classes.submit} d-flex center-children py-2 btn w-100 border-0`}
                    >
                        {
                            !submitting
                                ? <span className={classes.submitText}>Login</span>
                                : <Icon className={`${classes.submitIcon}`} path={mdiLoading} spin={1} />
                        }
                    </Tooltip>
                </div>
            </form>
        </>
    );
}