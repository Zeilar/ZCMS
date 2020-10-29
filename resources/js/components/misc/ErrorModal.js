import { createUseStyles } from 'react-jss';
import { mdiAlertCircle } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

export default function ErrorModal({ error }) {
    const styles = createUseStyles({
        '@keyframes fadeIn': {
            from: {
                top: '18vh',
                opacity: 0,
            },
            to: {
                top: '20vh',
                opacity: 1,
            },
        },
        '@keyframes fadeOut': {
            to: {
                top: '18vh',
                opacity: 0,
            },
        },
        modal: {
            boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.25), inset 0 0 5px 0 rgba(0, 0, 0, 0.25)',
            animation: '$fadeIn 0.25s linear forwards, $fadeOut 0.25s 2s linear forwards',
            backgroundColor: 'rgb(200, 0, 0)',
            transform: 'translateX(-50%)',
            letterSpacing: 1,
            borderRadius: 3,
            color: 'white',
            left: '50%',
        },
        text: {

        },
    });
    const classes = styles();

    return (
        <div className={`${classes.modal} absolute center-children bold p-2 row no-select`}>
            <Icon path={mdiAlertCircle} />
            <span className={`${classes.text} ml-1`}>
                {error}
            </span>
        </div>
    );
}
