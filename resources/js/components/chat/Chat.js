import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import { mdiChatOutline } from '@mdi/js';
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

    const [show, setShow] = useState(true);

    return (
        <div className={classes.chatOuter}>
            {
                show
                    ? <ChatInner setShow={setShow} />
                    : <button className={classes.toggler} onClick={() => setShow(true)}>
                        <Icon className={classes.icon} path={mdiChatOutline} />
                    </button>
            }
        </div>
    );
}