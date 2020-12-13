import useOnclickOutside from 'react-cool-onclickoutside';
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import classnames from 'classnames';

export default function CrudModal({ open = true, close, onSubmit, action = '', resource = '', render, fields = [] }) {
    const styles = createUseStyles({
        modal: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.5)'],
            transition: 'all 0.25s linear',
            height: '100vh',
            width: '100vw',
            zIndex: 1000,
            '&.closed': {
                display: 'none',
            },
        },
        content: {
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.25s linear',
            borderRadius: 2,
            zIndex: 5000,
        },
        background: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
        },
    });
    const classes = styles();

    const [fieldsState, setFieldsState] = useState(fields);

    const modal = useOnclickOutside(() => {
        close();
    });

    return (
        <form className={classnames(classes.modal, 'col fixed center-self center-children p-2', { closed: !open })} onSubmit={onSubmit}>
            <div className={classnames(classes.background, 'absolute')} />
            <div className={classnames(classes.content, 'col w-fit p-3')} ref={modal}>
                <h2 className={classnames(classes.title, 'mb-2')}>{action} {resource}</h2>
                <div className={classnames(classes.fields, 'col')}>
                    {render(fieldsState, setFieldsState)}
                </div>
            </div>
        </form>
    );
}
