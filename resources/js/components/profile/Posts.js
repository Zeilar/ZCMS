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

    const { id, page } = useParams();

    const { data, status } = useQuery([page ?? 1, `profile-${id}-posts`], async () => {
        const pageFinal = page ? `?page=${page ?? 1}` : '';
        const { data, code } = await Http.get(`profile/${id}/posts${pageFinal}`);
        if (code !== 200) return code;
        return data;
    }, { retry: false });

    if (status === 'loading') {
        return <Icon className={classnames(classes.icon, 'center-self loadingWheel-2')} path={mdiLoading} spin={1} />
    }

    const paginationRender = () => {
        return (
            <Pagination pagination={{
                currentPage: data.current_page,
                lastPage: data.last_page,
                perPage: data.per_page,
                total: data.total,
            }} />
        );
    }

    return (
        <div className={classnames(classes.posts)}>
            {paginationRender()}
            {data.data.length > 0 && data.data.map(post => <Post post={post} controls={false} key={post.id} />)}
            {paginationRender()}
        </div>
    );
}
