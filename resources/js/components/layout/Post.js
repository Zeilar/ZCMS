import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

export default function Post({ post }) {
    const styles = createUseStyles({
        post: {
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 3,
            '&:last-child': {
                marginBottom: 0,
            },
        },
        avatar: {
            height: 50,
            width: 50,
        },
        head: {
            borderBottom: '1px solid var(--border-primary)',
        },
        footer: {
            borderTop: '1px solid var(--border-primary)',
        },
        metaboxes: {
            alignItems: 'center',
        },
        metabox: {
            borderLeft: '1px solid var(--border-primary)',
            textTransform: 'capitalize',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: [20, 30],
            display: 'flex',
            height: '100%',
        },
        metaboxHeader: {
            fontWeight: 'normal',
            fontSize: '0.9rem',
            marginBottom: 5,
        },
        metaboxValue: {
            fontWeight: 'bold',
        },
    });
    const classes = styles();

    return (
        <article className={classnames(classes.post, 'col mb-2')}>
            <div className={classnames(classes.head, 'row')}>
                <img className={classnames(classes.avatar, 'd-flex mx-2 my-auto')} src={`/storage/avatars/${post.user.avatar}`} alt="Profile picture" />
                <h3 className={classnames(classes.username, 'bold center-children')}>{post.user.username}</h3>
                <div className={classnames(classes.metaboxes, 'ml-auto d-flex')}>
                    <div className={classnames(classes.metabox)}>
                        <h4 className={classnames(classes.metaboxHeader)}>Posts</h4>
                        <span className={classnames(classes.metaboxValue)}>{post.user.postsAmount}</span>
                    </div>
                    <div className={classnames(classes.metabox)}>
                        <h4 className={classnames(classes.metaboxValue)}>{post.user.roles[0].name}</h4>
                    </div>
                </div>
            </div>
            <p className={classnames(classes.body, 'p-2')}>
                {post.content}
            </p>
            <div className={classnames(classes.footer, 'row p-2')}>
                Post footer
            </div>
        </article>
    );
}
