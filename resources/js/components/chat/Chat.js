import { mdiChatProcessingOutline, mdiClose } from '@mdi/js';
import React, { useState, useEffect } from 'react';
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
            'pointer-events': 'all',
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

    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState();
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
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
        if (messages?.length && !error && !connected) {
            window.Echo.join('shoutbox')
                .here(users => {
                    setUsers(users.length);
                })
                .joining(user => setUsers(p => p + 1))
                .leaving(user => setUsers(p => p - 1))
                .listen('NewChatmessage', e => {
                    setMessages(prev => [...prev.slice(1), e.message]);
                });
            setConnected(true);
        }
        if (messages == null) getMessages();
        if (user == null) {
            fetch('/api/authenticate', { method: 'POST' })
                .then(response => response.json())
                .then(user => setUser(user))
                .catch(error => error);
        }
    }, [user, messages, setMessages, setUsers]);

    return (
        <div className={classes.chatOuter}>
            <ChatInner show={show} error={error} getMessages={getMessages} messages={messages} users={users} user={user} setShow={setShow} />
            <button className={classes.toggler} onClick={() => setShow(p => !p)}>
                {
                    show
                        ? <Icon className={classes.icon} path={mdiClose} />
                        : <Icon className={classes.icon} path={mdiChatProcessingOutline} />
                }
            </button>
        </div>
    );
}