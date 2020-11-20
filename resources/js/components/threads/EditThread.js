import { mdiCogOutline, mdiClose, mdiCheck, mdiLoading, mdiTrashCanOutline, mdiLockOutline, mdiLockOpenOutline } from '@mdi/js';
import { FeedbackModalContext, UserContext } from '../../contexts';
import { errorCodeHandler } from '../../functions/helpers';
import React, { useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { Http } from '../../classes';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function EditThread({ thread, refetch }) {
    const styles = createUseStyles({
        wrapper: {
            
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
            fontSize: '1.5rem',
            height: 50,
        },
        error: {
            color: 'var(--color-danger)',
        },
    });
    const classes = styles();

    const [locked, setLocked] = useState(parseInt(thread.locked));
    const [input, setInput] = useState(thread.title);

    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [editing, setEditing] = useState(false);

    const [error, setError] = useState();

    const { setType, setMessage } = useContext(FeedbackModalContext);
    const { user } = useContext(UserContext);

    const history = useHistory();

    if (!user) return null;

    const canRemove = () => user.roles[0].clearance <= 2;
    const canLock = () => user.roles[0].clearance <= 3;

    async function submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', input);
        formData.append('locked', locked);
        setSubmitting(true);
        const response = await Http.post(`threads/${thread.id}`, { body: formData });
        setSubmitting(false);
        if (response.code === 422) return setError(response.data.errors.title[0]);
        errorCodeHandler(response.code, (message) => setMessage(message), () => {
            const thread = response.data;
            setEditing(false);
            setError(null);
            refetch();
            history.push(`/thread/${thread.id}/${thread.slug}`);
        });
    }

    async function remove() {
        if (!confirm('Are you sure you want to delete this thread?')) return;
        setDeleting(true);
        const response = await Http.delete(`threads/${thread.id}`);
        setDeleting(false);
        errorCodeHandler(response.code, (message) => setError(message), () => {
            setType('success');
            setMessage('Successfully deleted thread');
            history.push(`/category/${response.data.name.toLowerCase()}`);
        });
    }

    return (
        <>
            <form className={classnames(classes.wrapper, 'row center-children mb-2')} onSubmit={submit}>
                {
                    editing
                        ? (
                            <>
                                <input 
                                    className={classnames(classes.input, 'w-100')} value={input}
                                    onChange={e => setInput(e.target.value)} placeholder="Title"
                                />
                                {
                                    canRemove() &&
                                        <button
                                            className={classnames(classes.button, 'btn btn-outline btn-danger ml-2')}
                                            onClick={remove} type="button"
                                        >
                                            {deleting ? <Icon path={mdiLoading} spin={1} /> : <Icon path={mdiTrashCanOutline} />}
                                        </button>
                                }
                                {
                                    canLock() &&
                                        <button 
                                            className={classnames(classes.button, 'btn btn-outline mx-2 btn-dark')}
                                            onClick={() => setLocked(p => p ? 0 : 1)} type="button"
                                        >
                                            <Icon path={locked ? mdiLockOutline : mdiLockOpenOutline} />
                                        </button>
                                }
                                <button className={classnames(classes.button, 'btn btn-outline ml-2')} onClick={submit} disabled={submitting}>
                                    {submitting ? <Icon path={mdiLoading} spin={1} /> : <Icon path={mdiCheck} />}
                                </button>
                                <button
                                    className={classnames(classes.button, 'btn btn-outline ml-2 btn-dark')}
                                    onClick={() => setEditing(false)} type="button"
                                >
                                    <Icon path={mdiClose} />
                                </button>
                            </>
                        )
                        : (
                            <button className={classnames(classes.button, 'btn btn-outline ml-auto btn-dark')} onClick={() => setEditing(true)} type="button">
                                <Icon path={mdiCogOutline} />
                            </button>
                        )
                }
            </form>
            {error && <p className={classnames(classes.error, 'bold mb-2')}>{error}</p>}
        </>
    );
}