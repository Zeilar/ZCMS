import useOnclickOutside from 'react-cool-onclickoutside';
import { mdiClose, mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function CrudModal({ open = false, close, onSubmit, action = '', resource = '', render, fields = [] }) {
    const styles = createUseStyles({
        modal: {
            transition: 'all 0.25s linear',
            height: '100vh',
            width: '100vw',
            zIndex: 1000,
            '&.closed': {
                display: 'none',
            },
        },
        content: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.5)'],
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.25s linear',
            borderRadius: 2,
            minWidth: 400,
            zIndex: 5000,
        },
        background: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
        },
        fields: {
            gap: '20px',
        },
        submit: {
            fontSize: '1.25rem',
        },
        close: {
            background: 'none',
            border: 0,
            right: 15,
            top: 15,
        },
    });
    const classes = styles();

    const [fieldsState, setFieldsState] = useState(fields);
    const [submitting, setSubmitting] = useState(false);

    const modal = useOnclickOutside(close);

    return (
        <div className={classnames(classes.modal, 'col fixed center-self center-children p-2', { closed: !open })}>
            <div className={classnames(classes.background, 'absolute')} />
            <form className={classnames(classes.content, 'col p-3 relative')} ref={modal} onSubmit={e => {
                e.preventDefault();
                onSubmit(fieldsState, setSubmitting);
            }}>
                <button className={classnames(classes.close, 'absolute d-flex')} type="button" onClick={close}>
                    <Icon path={mdiClose} />
                </button>
                <h2 className={classnames(classes.title, 'mb-3')}>{action} {resource}</h2>
                <div className={classnames(classes.fields, 'col')}>
                    {render(fieldsState, setFieldsState)}
                </div>
                <button className={classnames(classes.submit, 'btn mt-3')}>
                    {submitting ? <Icon path={mdiLoading} style={{ width: 15 }} spin={1} /> : 'Submit'}
                </button>
            </form>
        </div>
    );
}
