import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Pagination } from '../misc';
import { mdiLoading } from '@mdi/js';
import { Http } from '../../classes';
import classnames from 'classnames';
import { Post } from '../layout';
import Icon from '@mdi/react';
import React from 'react';

export default function Posts() {
    const styles = createUseStyles({
        noposts: {
            fontSize: '1rem',
        },
    });
    const classes = styles();

    const { id, page } = useParams();

    const { data, status } = useQuery([page ?? '1', `profile-${id}-posts`], async () => {
        const pageFinal = page ? `?page=${page ?? '1'}` : '';
        const { data, code } = await Http.get(`profile/${id}/posts${pageFinal}`);
        if (code !== 200) return code;
        return data;
    }, { retry: false });

    if (status === 'loading') {
        return <Icon className={classnames('center-self loadingWheel-2')} path={mdiLoading} spin={1} />
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

    const gotPosts = () => data.data.length > 0;

    return (
        <div className={classnames(classes.posts)}>
            {!gotPosts() && <h5 className={classnames(classes.noposts, 'text-center')}>No posts were found</h5>}
            {gotPosts() && paginationRender()}
            {gotPosts() && data.data.map(post => <Post post={post} controls={false} permalink={true} key={post.id} />)}
            {gotPosts() && paginationRender()}
        </div>
    );
}
