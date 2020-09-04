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
    const [show, setShow] = useState(false);
    const [user, setUser] = useState();

    window.Echo.leave('shoutbox');
    window.Echo.join('shoutbox')
        .listen('NewChatmessage', e => {
            console.log(e);
        });

    useEffect(() => {
        console.log('render Chat.js');
        if (messages == null) {
            fetch('/chatmessages')
                .then(response => response.json())
                .then(messages => setMessages(messages.reverse()));
        }
        if (user == null) {
            fetch('/authenticate', { method: 'POST' })
                .then(response => response.json())
                .then(user => setUser(user));
        }
    });

    return (
        <div className={classes.chatOuter}>
            {show && <ChatInner messages={messages} user={user} setShow={setShow} />}
            <button className={classes.toggler} onClick={() => setShow(p => !p)}>
                <Icon className={classes.icon} path={mdiChatProcessingOutline} />
            </button>
        </div>
    );
}