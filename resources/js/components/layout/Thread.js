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
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.1s linear',
            alignItems: 'center',
            borderRadius: 3,
            padding: 15,
            '&:hover': {
                backgroundColor: 'var(--bg-color)',
            }
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
        },
        views: {
            marginLeft: '7.5%',
        },
        latest: {
            width: '15%',
        },
        latestLink: {
            color: 'var(--text-primary)',
            '&:hover': {
                color: 'var(--color-link)',
                textDecoration: 'none',
            },
        },
        latestDate: {
            fontSize: '0.85rem',
        },
        locked: {
            left: -35,
        },
    });
    const classes = styles();

    return (
        <article className={classnames(classes.thread, 'row mt-1')}>
            <div className={classnames('col w-50')}>
                <NavLink className={classnames(classes.title, 'w-fit bold')} to={`/thread/${thread.id}/${thread.slug}`}>
                    {thread.title}
                </NavLink>
                <NavLink
                    className={classnames(classes.op, `color-${thread.op.roles[0].clearance}`, 'bold mt-2 mr-auto')}
                    to={`/user/${thread.op.username}`}
                >
                    {thread.op.username}
                </NavLink>
            </div>
            <Tooltip className={classnames('ml-auto col center-children')} title="Posts">
                <Icon path={mdiForum} />
                <span>{thread.postsAmount}</span>
            </Tooltip>
            <Tooltip className={classnames(classes.views, 'mr-auto col center-children')} title="Views">
                <Icon path={mdiEye} />
                <span>{thread.views}</span>
            </Tooltip>
            <div className={`${classes.latest} col`}>
                <span className={classnames(classes.latestDate, 'ml-auto')}>
                    {humanReadableDate(thread.latestPost.created_at)}
                </span>
                <NavLink
                    className={classnames(classes.latestLink, `color-${thread.latestPost.user.roles[0].clearance}`, 'bold ml-auto mt-2')}
                    to={`/thread/${thread.id}/${thread.slug}/${thread.latestPost.pageNumber}/#${thread.latestPost.id}`}
                >
                    {thread.latestPost.user.username}
                </NavLink>
            </div>
            {parseInt(thread.locked) ? <Icon className={classnames(classes.locked, 'absolute')} path={mdiLock} /> : ''}
        </article>
    );
}