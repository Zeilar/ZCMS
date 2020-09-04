import React, { useState, useRef, useEffect } from 'react';
import { mdiClose, mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Chatmessage from './Chatmessage';
import Icon from '@mdi/react';

export default function ChatInner({ setShow }) {
    const styles = createUseStyles({
        chatInner: {
            'box-shadow': '0 0 25px 0 rgba(0, 0, 0, 0.15)',
            background: 'var(--chat-primary)',
            'flex-direction': 'column',
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
            'justify-content': 'center',
            'align-items': 'center',
            'margin-left': 'auto',
            background: 'none',
            display: 'flex',
        },
        closeIcon: {
            height: '20px',
            color: 'black',
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
            transform: 'translateX(-50%)',
            background: 'rgb(10, 10, 10)',
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
            'width': '0',
        },
        loadingIcon: {
            height: '75px',
            width: '75px',
        },
    });
    const classes = styles();

    window.Echo.join('shoutbox')
        .here(users => {

        })
        .listen('NewChatmessage', e => {
            console.log(e);
        });

    const [messages, setMessages] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        if (messages == null) {
            fetch('/chatmessages')
                .then(response => response.json())
                .then(messages => setMessages(messages));
        }
        if (user == null) {
            fetch('/authenticate', { method: 'POST' })
                .then(response => response.json())
                .then(user => setUser(user));
        }
    });

    return (
        <div className={classes.chatInner}>
            <div className={classes.toolbar}>
                <button className={classes.close} onClick={() => setShow(false)}>
                    <Icon className={classes.closeIcon} path={mdiClose} />
                </button>
            </div>

            <div className={`${classes.content} scrollbar`}>
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

            <div className={classes.footer}>
                {
                    user
                        ? <input className={classes.input} type="text" placeholder="Aa" />
                        : <input className={classes.input} type="text" placeholder="Aa" title="Please log in first" disabled />
                }
                <div className={`inputLine ${classes.inputLine}`}></div>
            </div>
        </div>
    );
}