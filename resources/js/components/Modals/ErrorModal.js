import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import './modal.css';

export default function ErrorModal({ message, setActive }) {
    document.querySelector('body').style.overflowY = 'hidden';

    const styles = createUseStyles({
        errorModal: {
            'box-shadow': '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
            animation: 'slide-in 0.5s ease-out forwards',
            background: 'var(--color-primary)',
            transform: 'translate(-50%, -50%)',
            'justify-content': 'center',
            'flex-direction': 'column',
            'border-radius': '0.25rem',
            'align-items': 'center',
            position: 'fixed',
            display: 'flex',
            left: '50%',
            '&.close': {
                animation: 'shrink-out 0.25s linear',
            }
        },
        content: {
            'justify-content': 'center',
            'flex-direction': 'column',
            'align-items': 'center',
            padding: '1.5rem',
            display: 'flex',
        },
        messages: {
            'margin-top': '1.5rem',
        },
        message: {
            color: 'var(--text-secondary)',
            'text-align': 'center',
        },
        title: {
            'margin-bottom': '0.25rem',
            'font-size': '1.25rem',
            'text-align': 'center',
            'text-weight': 'bold',
        },
        close: {
            'border-bottom-right-radius': 'inherit',
            'border-bottom-left-radius': 'inherit',
            background: 'var(--color-secondary)',
            padding: '0.75rem 0',
            cursor: 'pointer',
            color: 'white',
            width: '100%',
            '&:hover': {
                
            }
        },
        triangle: {
            color: 'var(--color-secondary)',
            'font-size': '250%',
        },
        dimmer: {
            animation: 'fade-in 0.25s linear forwards',
            background: 'black',
            position: 'fixed',
            opacity: '0.25',
            height: '100%',
            width: '100%',
            '&.close': {
                animation: 'fade-out 0.25s linear forwards',
            }
        },
    });
    const classes = styles();

    const dimmer = useRef();
    const modal = useRef();

    function close() {
        dimmer.current.classList.add('close');
        modal.current.classList.add('close');

        setTimeout(() => {
            setActive(false);
        }, 250);
    }

    return (
        <>
            <div className={classes.dimmer} ref={dimmer}></div>
            <div className={classes.errorModal} ref={modal}>
                <div className={classes.content}>
                    <FontAwesomeIcon className={classes.triangle} icon={faExclamationTriangle} />
                    <div className={classes.messages}>
                        <p className={classes.title}>Something went wrong</p>
                        <p className={classes.message}>{message}</p>
                    </div>
                </div>
                <button onClick={close} className={classes.close}>
                    <span>Dismiss</span>
                </button>
            </div>
        </>
    );
}