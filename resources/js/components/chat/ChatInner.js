import React, { useState, useRef, useEffect } from 'react';
import { mdiClose, mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Chatmessage from './Chatmessage';
import Icon from '@mdi/react';

export default function ChatInner({ setShow, messages, user }) {
    const styles = createUseStyles({
        chatInner: {
            'box-shadow': '0 0 25px 0 rgba(0, 0, 0, 0.15)',
            background: 'var(--chat-primary)',
            'flex-direction': 'column',
            'margin-bottom': '20px',
            'max-height': '500px',
            'max-width': '400px',
            display: 'flex',
        },
        toolbar: {
            'border-top-right-radius': '5px',
            'border-top-left-radius': '5px',
            background: 'var(--color-main)',
            display: 'flex',
            padding: '5px',
        },
        content: {
            overflow: 'auto',
            height: '50vh',
            margin: '5px',
            width: '20vw',
        },
        footer: {
            background: 'var(--color-primary)',
            position: 'relative',
        },
        close: {
            background: 'var(--color-primary)',
            color: 'var(--text-primary)',
            'justify-content': 'center',
            'align-items': 'center',
            'border-radius': '5px',
            'margin-left': 'auto',
            display: 'flex',
            padding: '5px',
            '&:hover': {
                background: 'var(--color-secondary)',
                color: 'var(--text-secondary)',
            },
        },
        closeIcon: {
            color: 'inherit',
            height: '20px',
            width: '20px',
        },
        input: {
            'font-size': '1rem',
            'border-radius': 0,
            background: 'none',
            padding: '10px',
            margin: '5px',
            width: '100%',
            border: 0,
            '&:focus ~ .inputLine': {
                width: 'calc(100% - 30px)',
            },
        },
        inputLine: {
            transition: 'width 0.15s linear',
            background: 'var(--color-main)',
            transform: 'translateX(-50%)',
            position: 'absolute',
            bottom: '5px',
            height: '2px',
            left: '50%',
            width: 0,
        },
        loading: {
            'justify-content': 'center',
            'align-items': 'center',
            display: 'flex',
            height: '100%',
        },
        loadingIcon: {
            height: '75px',
            width: '75px',
        },
    });
    const classes = styles();
        
    const messagesContainer = useRef();
    const form = useRef();

    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const response = await fetch('/chatmessages', { method: 'POST', body: formData })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log('something went wrong');
                }
            })

        // console.log(response);
    }

    useEffect(() => {
        
    });

    return (
        <div className={classes.chatInner}>
            <div className={classes.toolbar}>
                <button className={classes.close} onClick={() => setShow(false)}>
                    <Icon className={classes.closeIcon} path={mdiClose} />
                </button>
            </div>

            <div className={`${classes.content} scrollbar`} ref={messagesContainer}>
                {
                    messages
                        ? messages.map(message => (
                            <Chatmessage key={message.id} message={message} />
                        ))
                        : <div className={classes.loading}>
                            <Icon className={classes.loadingIcon} path={mdiLoading} spin={1} />
                        </div>
                }
            </div>

            <form className={classes.footer} onSubmit={submit} ref={form}>
                {
                    user
                        ? <input className={classes.input} type="text" name="content" placeholder="Aa" autoComplete="off" />
                        : <input className={classes.input} type="text" name="content" placeholder="Aa" autoComplete="off" title="Please log in first" disabled />
                }
                <div className={`inputLine ${classes.inputLine}`}></div>
            </form>
        </div>
    );
}