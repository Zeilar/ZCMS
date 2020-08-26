import { faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clickOutside from 'react-cool-onclickoutside';
import { createUseStyles } from 'react-jss';
import React, { useRef } from 'react';
import './modal.css';

export default function PopupModal({ message, type, setActive, title = 'Something went wrong' }) {
    document.querySelector('body').style.overflowY = 'hidden';

    const styles = createUseStyles({
        wrapper: {
            'z-index': '1000001',
        },
        modal: {
            animation: 'popup-modal-slide-in 0.5s ease-out forwards',
            'box-shadow': '0 0 5px 0 rgba(0, 0, 0, 0.25)',
            transform: 'translate(-50%, -50%)',
            background: 'var(--color-primary)',
            'justify-content': 'center',
            'flex-direction': 'column',
            'border-radius': '0.25rem',
            'align-items': 'center',
            position: 'fixed',
            display: 'flex',
            left: '50%',
            '&.close': {
                animation: 'popup-modal-shrink-out 0.25s linear',
            }
        },
        content: {
            'justify-content': 'center',
            'flex-direction': 'column',
            'align-items': 'center',
            display: 'flex',
            padding: '1rem',
        },
        messages: {
            'margin': '1.5rem',
        },
        message: {
            color: 'var(--text-secondary)',
            'text-align': 'center',
        },
        title: {
            color: 'var(--text-secondary)',
            'margin-bottom': '0.5rem',
            'text-align': 'center',
            'font-size': '1.25rem',
            'font-weight': 'bold',
        },
        close: {
            transition: 'transform 0.15s ease-in-out',
            background: type === 'error' ? 'rgb(200, 0, 0)' : 'rgb(0, 150, 0)',
            'letter-spacing': '1px',
            padding: '0.75rem 0',
            width: '100%',
            '&:hover': {
                transform: 'scale(1.02)',
            },
            '&.error:hover': {
                'background-color': 'rgb(175, 0, 0)',
            },
            '&.success:hover': {
                'background-color': 'rgb(0, 125, 0)',
            },
        },
        triangle: {
            color: type === 'error' ? 'rgb(200, 0, 0)' : 'rgb(0, 150, 0)',
            'font-size': '250%',
        },
        dimmer: {
            animation: 'popup-modal-fade-in 0.25s linear forwards',
            'z-index': '1000000',
            background: 'black',
            position: 'fixed',
            opacity: '0.25',
            height: '100%',
            width: '100%',
            '&.close': {
                animation: 'popup-modal-fade-out 0.15s linear forwards',
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
        }, 150);
    }

    const wrapper = clickOutside(() => {
        close(); 
    });

    return (
        <>
            <div className={classes.dimmer} ref={dimmer}></div>
            <div className={classes.wrapper} ref={wrapper}>
                <div className={classes.modal} ref={modal}>
                    <div className={classes.content}>
                        <FontAwesomeIcon className={classes.triangle} icon={type === 'error' ? faExclamationTriangle : faCheckCircle} />
                        <div className={classes.messages}>
                            <p className={classes.title}>
                                {type === 'error' ? title : 'Success'}
                            </p>
                            <p className={classes.message}>{message}</p>
                        </div>
                        <button onClick={close} className={`btnPrimary ${type === 'error' ? 'error' : 'success'} ${classes.close}`}>
                            <span>Dismiss</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}