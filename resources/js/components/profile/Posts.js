import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { mdiLoading } from '@mdi/js';
import { Pagination } from '../misc';
import { Http } from '../../classes';
import classnames from 'classnames';
import { Post } from '../layout';
import Icon from '@mdi/react';

export default function Posts() {
    const styles = createUseStyles({
        icon: {
            color: 'var(--color-main)',
        },
    });
    const classes = styles();

    const { id } = useParams();

    const { data, status } = useQuery(`profile-${id}-posts`, async () => {
        const { data, code } = await Http.get(`profile/${id}/posts`);
        if (code !== 200) return code;
        return data;
    }, { retry: false });

    if (status === 'loading') {
        return <Icon className={classnames(classes.icon, 'center-self loadingWheel-2')} path={mdiLoading} spin={1} />
    }

    return (
        <div className={classnames(classes.posts)}>
            {data.data.length > 0 && data.data.map(post => <Post post={post} controls={false} key={post.id} />)}
        </div>
    );
}
