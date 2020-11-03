import { FeedbackModalContext } from '../../contexts/FeedbackModalContext';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Redirect, useHistory } from 'react-router';
import Validator from '../../classes/Validator';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Http from '../../classes/Http';
import { mdiLoading } from '@mdi/js';
import Header from '../Header';
import Icon from '@mdi/react';


export default function Register() {
    const { setMessage, setType } = useContext(FeedbackModalContext);
    const { user, setUser } = useContext(UserContext);

    if (user) {
        setMessage('You are already logged in');
        return <Redirect to="/" />
    }

    const styles = createUseStyles({
        register: {
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 3,
            width: '22.5%',
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
            color: 'var(--text-secondary)',
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
        errors: {
            padding: 35,
        },
        error: {
            backgroundColor: 'rgba(200, 0, 50, 0.05)',
            color: 'var(--text-secondary)',
            borderLeft: '3px solid red',
            borderBottomRightRadius: 2,
            borderTopRightRadius: 2,
            marginBottom: 10,
            '&:last-child': {
                marginBottom: 0,
            },
        },
    });
    const classes = styles();

    const [errors, setErrors] = useState({ username: [], email: [], password: [], password_confirmation: [] });
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    function register(e) {
        e.preventDefault();

        const errors = [
            ...validateUsername(),
            ...validateEmail(),
            ...validatePassword(),
            ...validatePasswordConfirm(),
        ];

        if (errors.length <= 0) submit();
    }

    async function submit() {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirm);

        setSubmitting(true);
        const response = await Http.post('register', { body: formData });
        setSubmitting(false);

        if (response.code === 200) {
            history.push('/');
            setUser(response.data);
            setType('success');
            setMessage('Successfully created account!');
        } else if (response.code === 422) {
            setErrors(response.data.errors);
        } else {
            setMessage('Something went wrong');
        }
    }
    
    function usernameBlur() {
        if (username === '') {
            return setErrors(p => ({...p, username: [] }));
        }
        validateUsername();
    }

    function validateUsername() {
        const input = new Validator(username, 'Username');
        const results = input.required().min(5).max(15);
        setErrors(p => ({...p, username: results.errors }));
        return results.errors;
    }

    function emailBlur() {
        if (email === '') {
            return setErrors(p => ({...p, email: [] }));
        }
        validateEmail();
    }

    function validateEmail() {
        const input = new Validator(email, 'Email');
        const results = input.required();
        setErrors(p => ({...p, email: results.errors }));
        return results.errors;
    }

    function passwordBlur() {
        if (password === '') {
            return setErrors(p => ({...p, password: [] }));
        }
        validatePassword();
    }

    function validatePassword() {
        const input = new Validator(password, 'Password');
        const results = input.required().min(5).max(30).equalWith(passwordConfirm);
        setErrors(p => ({...p, password: results.errors }));
        return results.errors;
    }

    function passwordConfirmBlur() {
        if (passwordConfirm === '') {
            return setErrors(p => ({...p, password_confirmation: [] }));
        }
        validatePasswordConfirm();
    }

    function validatePasswordConfirm() {
        const input = new Validator(passwordConfirm, 'Password confirmation');
        const results = input.required().min(5).max(30);
        setErrors(p => ({...p, password_confirmation: results.errors }));
        return results.errors;
    }

    function anyErrors() {
        for (const property in errors) {
            if (errors[property].length > 0) return true;
        }
        return false;
    }

    const renderErrors = () => {
        if (!anyErrors()) return;

        const errorsJsx = [];
        for (const property in errors) {
            if (errors[property][0]) {
                errorsJsx.push(<p className={`${classes.error} p-2`} key={Math.random()} dangerouslySetInnerHTML={{ __html: errors[property][0] }} />);
            }
        }

        return (
            <div className={`${classes.errors} col pb-0`}>
                {errorsJsx}
            </div>
        );
    }

    return (
        <>
            <Header />
            <h2 className={classes.header}>Register</h2>
            <form className={`${classes.register} mx-auto mt-4`} onSubmit={register}>
                {renderErrors()}
                <div className={`${classes.row} pb-0 col`}>
                    <label className={classes.label}>Username</label>
                    <input className={`${classes.input} mt-2`} value={username} onChange={e => setUsername(e.target.value)} onBlur={usernameBlur} />
                </div>
                <div className={`${classes.row} pb-0 col`}>
                    <label className={classes.label}>Email</label>
                    <input className={`${classes.input} mt-2`} value={email} onChange={e => setEmail(e.target.value)} onBlur={emailBlur} />
                </div>
                <div className={`${classes.row} pb-0 col`}>
                    <label className={classes.label}>Password</label>
                    <input
                        onChange={e => setPassword(e.target.value)} onBlur={passwordBlur}
                        className={`${classes.input} mt-2`} type="password" value={password}
                    />
                </div>
                <div className={`${classes.row} col`}>
                    <label className={classes.label}>Confirm Password</label>
                    <input
                        onChange={e => setPasswordConfirm(e.target.value)} onBlur={passwordConfirmBlur}
                        className={`${classes.input} mt-2`} value={passwordConfirm} type="password"
                    />
                </div>
                <div className={`${classes.row} pt-0 row center-children`}>
                    <div className="row">
                        <span className="ml-auto mr-1">Already got an account?</span>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
                <div className={`${classes.footer}`}>
                    <button className={`${classes.submit} d-flex center-children py-2 btn w-100 border-0`} disabled={submitting}>
                        {
                            !submitting
                                ? <span className={classes.submitText}>Register</span>
                                : <Icon className={`${classes.submitIcon}`} path={mdiLoading} spin={1} />
                        }
                    </button>
                </div>
            </form>
        </>
    );
}