import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import moment from 'moment';

export default function Chatmessage({ message }) {
    const styles = createUseStyles({
        message: {
            margin: '20px',
        },
        content: {
            'box-shadow': '0 0 5px 0 rgba(0, 0, 0, 0.1)',
            background: 'var(--chat-secondary)',
            color: 'var(--text-secondary)',
            'border-radius': '10px',
            padding: '10px',
        },
        meta: {
            'justify-content': 'space-between',
            color: 'var(--chat-text)',
            'margin-bottom': '4px',
            'font-size': '0.8rem',
            padding: '0 10px',
            display: 'flex',
        },
        date: {

        },
        username: {

        },
    });
    const classes = styles();

    return (
        <div className={classes.message}>
            <div className={classes.meta}>
                <span className={classes.username}>
                    {message.user.username}
                </span>
                <span className={classes.date}>
                    {moment(new Date(message.created_at)).format('MMM Mo HH:mm')}
                </span>
            </div>
            <div className={classes.content}>
                {message.content}
            </div>
        </div>
    );
}