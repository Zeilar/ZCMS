import { humanReadableDate } from '../../functions/helpers';
import { mdiLock, mdiEye, mdiForum } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Tooltip } from '../misc';
import Icon from '@mdi/react';
import React from 'react';

export default function Thread({ thread }) {
    const styles = createUseStyles({
        thread: {
            boxShadow: [0, 3, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.1s linear',
            alignItems: 'center',
            borderRadius: 3,
            padding: 15,
            '&:hover': {
                backgroundColor: 'var(--bg-color)',
            },
            '@media (max-width: 768px)': {
                fontSize: '0.85rem',
                flexWrap: 'wrap',
            },
        },
        container: {
            width: '50%',
            '@media (max-width: 768px)': {
                width: 'unset',
            },
        },
        title: {
            color: 'var(--text-primary)',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        op: {
            color: 'var(--text-secondary)',
            '&:hover': {
                textDecoration: 'none',
            },
            '@media (max-width: 768px)': {
                display: 'none',
            },
        },
        posts: {
            '@media (max-width: 768px)': {
                display: 'none',
            },
        },
        views: {
            marginLeft: '7.5%',
            '@media (max-width: 768px)': {
                display: 'none',  
            },
        },
        latest: {
            width: '15%',
            '@media (max-width: 768px)': {
                flexDirection: 'row',
                width: 'unset',
                marginTop: 10,
            },
        },
        latestLink: {
            color: 'var(--text-primary)',
            marginTop: 10,
            '&:hover': {
                color: 'var(--color-link)',
                textDecoration: 'none',
            },
            '@media (max-width: 768px)': {
                marginTop: 0,  
            },
        },
        latestDate: {
            fontSize: '0.85rem',
            marginLeft: 'auto',
            '@media (max-width: 768px)': {
                marginRight: 5,  
            },
        },
        locked: {
            left: -35,
        },
    });
    const classes = styles();

    return (
        <article className={classnames(classes.thread, 'row mt-2')}>
            <div className={classnames(classes.container, 'col')}>
                <NavLink className={classnames(classes.title, 'w-fit bold')} to={`/thread/${thread.id}/${thread.slug}`}>
                    {thread.title}
                </NavLink>
                <NavLink
                    className={classnames(classes.op, `color-${thread.user.roles[0].clearance}`, 'bold mt-2 mr-auto')}
                    to={`/user/${thread.user.username}`}
                >
                    {thread.user.username}
                </NavLink>
            </div>
            <Tooltip className={classnames(classes.posts, 'ml-auto col center-children')} title="Posts">
                <Icon path={mdiForum} />
                <span>{thread.postsAmount}</span>
            </Tooltip>
            <Tooltip className={classnames(classes.views, 'mr-auto col center-children')} title="Views">
                <Icon path={mdiEye} />
                <span>{thread.views}</span>
            </Tooltip>
            <div className={`${classes.latest} col`}>
                <span className={classnames(classes.latestDate)}>
                    {humanReadableDate(thread.latestPost.created_at)}
                </span>
                <NavLink
                    className={classnames(classes.latestLink, `color-${thread.latestPost.user.roles[0].clearance}`, 'bold ml-auto')}
                    to={`/thread/${thread.id}/${thread.slug}/${thread.latestPost.pageNumber}#${thread.latestPost.id}`}
                >
                    {thread.latestPost.user.username}
                </NavLink>
            </div>
            {parseInt(thread.locked) ? <Icon className={classnames(classes.locked, 'absolute')} path={mdiLock} /> : ''}
        </article>
    );
}