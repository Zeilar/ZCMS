import { FeedbackModalContext, UserContext } from '../../contexts';
import React, { useState, useRef, useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import { PasswordField, Checkbox } from '../misc';
import { Http, Validator, } from '../../classes';
import { Knockout } from '../styled-components';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import { mdiLoading } from '@mdi/js';
import { Header } from '../layout';
import Icon from '@mdi/react';

export default function Login({ location }) {
    const { setMessage } = useContext(FeedbackModalContext);
    const { user, setUser } = useContext(UserContext);

    if (user) {
        setMessage('You are already logged in');
        return <Redirect to="/" />
    }

    document.title = 'TPH | Login';

    const styles = createUseStyles({
        login: {
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            margin: [25, 'auto', 0, 'auto'],
            borderRadius: 3,
            width: '22.5%',
            '@media (max-width: 1200px)': {
                width: '50%',
            },
            '@media (max-width: 768px)': {
                margin: ['var(--container-margin)'],
                width: 'unset',
                marginTop: 15,
            },
        },
        header: {
            fontSize: '2rem',
            marginTop: 50,
            '@media (max-width: 768px)': {
                marginTop: 'var(--container-margin)',
                fontSize: '1.5rem',
            },
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
            backgroundColor: 'var(--color-body)',
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

    const [errors, setErrors] = useState({ id: null, password: null });
    const [submitting, setSubmitting] = useState(false);
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const history = useHistory();
    const remember = useRef();

    function login(e) {
        e.preventDefault();
        const errors = [validateId(), validatePassword()];
        if (errors.find(element => element !== undefined)) {
            return;
        }
        submit();
    }

    async function submit() {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);
        formData.append('remember', remember.current.checked);

        setSubmitting(true);
        const response = await Http.post('login', { body: formData });
        setSubmitting(false);

        if (response.code === 200) {
            history.push(location.state?.url ? location.state.url : '/');
            setUser(response.data);
        } else if (response.code === 422) {
            setErrors({ ...response.data });
        } else {
            setMessage('Something went wrong');
        }
    }

    function validateId() {
        const input = new Validator(id, 'Username or Email');
        const results = input.required();
        const error = results.errors[0];
        setErrors(p => ({...p, id: error }));
        return error;
    }

    function validatePassword() {
        const input = new Validator(password, 'Password');
        const results = input.required();
        const error = results.errors[0];
        setErrors(p => ({...p, password: error }));
        return error;
    }

    function anyErrors() {
        for (const property in errors) {
            if (errors[property]) return true;
        }
        return false;
    }

    const renderErrors = () => {
        if (!anyErrors()) return;

        const errorsJsx = [];
        for (const property in errors) {
            if (errors[property]) {
                errorsJsx.push(<p className={`${classes.error} p-2`} key={Math.random()} dangerouslySetInnerHTML={{ __html: errors[property] }} />);
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
            <Knockout className={`${classes.header} text-center`} as="h2">Login</Knockout>
            <form className={`${classes.login}`} onSubmit={login}>
                {renderErrors()}
                <div className={`${classes.row} pb-0 col`}>
                    <label className={classes.label}>Username or Email</label>
                    <input className={`${classes.input} mt-2`} value={id} onChange={e => setId(e.target.value)} type="text" />
                </div>
                <div className={`${classes.row} col`}>
                    <div className="row">
                        <label className={classes.label}>Password</label>
                        <NavLink className="ml-auto" to="/forgot-password" tabIndex={-1}>Forgot password?</NavLink>
                    </div>
                    <PasswordField onChange={e => setPassword(e.target.value)} containerClass="mt-2" className={classes.input} value={password} />
                </div>
                <div className={`${classes.row} pt-0 row center-children`}>
                    <Checkbox forwardRef={remember} className="mr-2" id="remember" />
                    <label className={`${classes.label} mr-auto pointer no-select`} htmlFor="remember">
                        Remember me
                    </label>
                    <NavLink className="ml-auto" to="/register">Register</NavLink>
                </div>
                <div className={`${classes.footer}`}>
                    <button className={`${classes.submit} d-flex center-children py-2 btn w-100 border-0`} disabled={submitting}>
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