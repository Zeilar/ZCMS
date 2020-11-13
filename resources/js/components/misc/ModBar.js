import { mdiCogOutline, mdiClose, mdiCheck, mdiLoading, mdiLockOpen, mdiLock } from '@mdi/js';
import { errorCodeHandler } from '../../functions/helpers';
import { UserContext } from '../../contexts/UserContext';
import React, { useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import Http from '../../classes/Http';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function ModBar({ data, input, field, url }) {
    const styles = createUseStyles({
        modbar: {
            
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            padding: 10,
            height: 50,
            width: 50,
        },
        input: {
            height: 50,
        },
        error: {
            color: 'var(--color-danger)',
        },
    });
    const classes = styles();

    const [inputValue, setInputValue] = useState(input);
    const [submitting, setSubmitting] = useState(false);
    const [locked, setLocked] = useState(data.locked);
    const [editing, setEditing] = useState(false);
    const { user } = useContext(UserContext);
    const [error, setError] = useState();
    const history = useHistory();

    function canModify() {
        if (!user || user.suspended) return false;
        if (user.roles[0].clearance <= 3) return true;
        return false;
    }

    function edit() {
        if (!canModify()) return;
        setEditing(true);
    }

    async function submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append(field, inputValue);
        formData.append('locked', locked);
        setSubmitting(true);
        const response = await Http.post(`${url}/${data.id}`, { body: formData });
        setSubmitting(false);
        if (response.code === 422) return setError(response.data.errors.title[0]);
        errorCodeHandler(response.code, (message) => setError(message), () => {
            const thread = response.data;
            setEditing(false);
            setError(null);
            history.push(`/thread/${thread.id}/${thread.slug}`);
        });
    }

    const buttonsRender = () => {
        if (editing) {
            if (submitting) {
                return (
                    <button className={classnames(classes.button, 'btn btn-outline ml-auto no-pointer')}>
                        <Icon path={mdiLoading} spin={1} />
                    </button>
                );
            }
            return <>
                <input className={classnames(classes.input, 'w-100')} value={inputValue} onChange={e => setInputValue(e.target.value)} />
                <button className={classnames(classes.button, 'btn btn-outline ml-2 btn-dark')} onClick={() => setLocked(p => p ? 0 : 1)} type="button">
                    <Icon path={locked ? mdiLock : mdiLockOpen} />
                </button>
                <button className={classnames(classes.button, 'btn btn-outline ml-2')} onClick={edit}>
                    <Icon path={mdiCheck} />
                </button>
                <button className={classnames(classes.button, 'btn btn-outline ml-2 btn-dark')} onClick={() => setEditing(false)} type="button">
                    <Icon path={mdiClose} />
                </button>
            </>;
        }
        return (
            <button className={classnames(classes.button, 'btn btn-outline ml-auto btn-dark')} onClick={edit} type="button">
                <Icon path={mdiCogOutline} />
            </button>
        );
    }

    return (
        <>
            <form className={classnames(classes.modbar, 'row center-children mb-2')} onSubmit={submit}>
                {buttonsRender()}
            </form>
            {error && <p className={classnames(classes.error, 'bold mb-2')}>{error}</p>}
        </>
    );
}