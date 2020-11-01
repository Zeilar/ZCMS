import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { createUseStyles } from 'react-jss';
import { Redirect } from 'react-router';
import Http from '../../classes/Http';
import { mdiLoading } from '@mdi/js';
import Header from '../Header';
import Icon from '@mdi/react';

export default function Login() {
    const { user } = useContext(UserContext);
    if (user) return <Redirect to={{ pathname: '/', state: { error: 'You are already logged in' } }} />

    const styles = createUseStyles({
        login: {
            backgroundColor: 'var(--color-primary)',
            borderColor: 'var(--border-primary)',
            borderRadius: 3,
            width: '20%',
        },
        input: {
            borderColor: 'var(--border-secondary)',
            backgroundColor: 'transparent',
            transition: 'all 0.1s linear',
            fontSize: '1.25rem',
            borderRadius: 3,
            padding: 8,
            '&:focus': {
                boxShadow: [0, 0, 0, 1, 'var(--color-main)'],
                borderColor: 'var(--color-main)',
            },
        },
        row: {
            padding: 30,
            '&.id': {
                paddingBottom: 0,
            },
        },
        label: {
            color: 'var(--border-secondary)',
        },
        footer: {
            borderTop: '1px solid var(--border-primary)',
            backgroundColor: 'var(--body-bg)',
            padding: 30,
        },
        submit: {
            boxShadow: [0, 0, 10, 1, 'rgba(0, 0, 0, 0.15)'],
            fontSize: '1.25rem',
            borderRadius: 30,
            padding: [10, 30],
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

    async function login(e) {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);

        const response = await Http.post('login', { body: formData }, true);
        if (response.code === 200) location.href = location.origin;

        setSubmitting(false);
    }

    return (
        <>
            <Header />
            <h2 className={classes.header}>
                Login
            </h2>
            <form className={`${classes.login} border-1 mx-auto mt-5`} onSubmit={login}>
                <div className={`${classes.row} id col`}>
                    <label className={classes.label}>
                        Username or Email
                    </label>
                    <input className={`${classes.input} mt-1 border-1`} value={id} onChange={(e) => setId(e.target.value)} id="id" />
                </div>
                <div className={`${classes.row} col`}>
                    <label className={classes.label}>
                        Password
                    </label>
                    <input
                        className={`${classes.input} mt-1 border-1`} id="password" type="password"
                        onChange={(e) => setPassword(e.target.value)} value={password} 
                    />
                </div>
                <div className={`${classes.footer}`}>
                    <button className={`${classes.submit} d-flex center-children btn w-100 border-0`} disabled={submitting || !id || !password}>
                        {
                            !submitting
                                ? <span className={classes.submitText}>Login</span>
                                : <Icon className={`${classes.submitIcon}`} path={mdiLoading} spin={1} />
                        }
                    </button>
                </div>
            </form>
        </>
    );
}