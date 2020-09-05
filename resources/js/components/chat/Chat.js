import React, { useState, useEffect, useRef } from 'react';
import { mdiChatProcessingOutline } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import ChatInner from './ChatInner';
import Icon from '@mdi/react';
import './chat.scss';

export default function Chat() {
    const styles = createUseStyles({
        chatOuter: {
            
        },
        toggler: {
            'justify-content': 'center',
            'align-items': 'center',
            'margin-left': 'auto',
            background: 'none',
            display: 'flex',
            height: '40px',
            width: '40px',
        },
        icon: {
            color: 'var(--color-main)',
            height: '100%',
            width: '100%',
        },
    });
    const classes = styles();

    const [messages, setMessages] = useState();
    const [error, setError] = useState(false);
    const [show, setShow] = useState(true);
    const [user, setUser] = useState();

    async function getMessages() {
        setMessages([]);
        setError(false);
        await fetch('/chatmessages')
            .then(response => response.json())
            .then(messages => {
                setMessages(messages.reverse());
                setError(false);
            })
            .catch(error => {
                setError(true);
            });
    }

    useEffect(() => {
        window.Echo.leave('shoutbox');
        window.Echo.join('shoutbox')
            .listen('NewChatmessage', e => {
                setMessages(prev => [...prev.slice(1), e.message]);
            });
        if (messages == null) getMessages();
        if (user == null) {
            fetch('/authenticate', { method: 'POST' })
                .then(response => response.json())
                .then(user => setUser(user))
                .catch(error => error);
        }
    }, [user, messages, setMessages]);

    return (
        <div className={classes.chatOuter}>
            {show && <ChatInner error={error} getMessages={getMessages} messages={messages} user={user} setShow={setShow} />}
            <button className={classes.toggler} onClick={() => setShow(p => !p)}>
                <Icon className={classes.icon} path={mdiChatProcessingOutline} />
            </button>
        </div>
    );
}