import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Chatmessage from './Chatmessage';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

export default function Chat() {
    const styles = createUseStyles({
        chat: {
            'flex-direction': 'column',
            display: 'flex',
            height: '400px',
            width: '300px',
        },
        toolbar: {
            display: 'flex',

            border: '1px solid blue',
        },
        content: {

        },
        footer: {
            border: '1px solid yellow',
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
            width: '20px',
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

    useEffect(() => {
        if (messages == null) {
            fetch('/chatmessages')
                .then(response => response.json())
                .then(messages => setMessages(messages));
        }
        console.log(messages);
    });

    return (
        <div className={classes.chat}>
            <div className={classes.toolbar}>

                <button className={classes.close}>
                    <Icon className={classes.closeIcon} path={mdiClose} />
                </button>
            </div>

            <div className={classes.content}>
                {
                    messages && messages.map(message => (
                        <Chatmessage key={message.id} message={message} />
                    ))
                }
            </div>

            <div className={classes.footer}>

            </div>
        </div>
    );
}