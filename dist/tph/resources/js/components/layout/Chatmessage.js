import { humanReadableDate } from '../../functions/helpers';
import { UserContext } from '../../contexts';
import { createUseStyles } from 'react-jss';
import React, { useContext } from 'react';
import classnames from 'classnames';

export default function Chatmessage({ className, message }) {
    const styles = createUseStyles({
        wrapper: {
            marginBottom: 35,
            '&:last-child': {
                marginBottom: 0,
            },
            '&.loading': {
                opacity: 0.5,
            },
        },
        content: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--text-primary)',
            borderRadius: 3,
        },
        avatar: {
            marginRight: 20,
            height: 50,
            width: 50,
        },
        meta: {
            fontSize: '0.85rem',  
        },
    });
    const classes = styles();

    const { user } = useContext(UserContext);

    return (
        <div className={classnames(classes.wrapper, className, { loading: message.loading }, 'w-fit row')}>
            <img className={classnames(classes.avatar, 'round')} src={`/storage/avatars/${message.user.avatar}`} alt="Profile picture" />
            <div className={classnames(classes.contentWrapper, 'col')}>
                <p className={classnames(classes.meta, 'mb-1')}>
                    <span className={classnames('bold mr-1')}>{message.user.id === user.id ? 'You' : message.user.username}</span>
                    <span>{humanReadableDate(message.created_at)}</span>
                </p>
                <p className={classnames(classes.content, 'p-2')}>{message.content}</p>
            </div>
        </div>
    );
}
