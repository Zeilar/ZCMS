import { Pagination } from '../misc';
import classnames from 'classnames';
import { Post } from '../layout';
import React from 'react';

export default function Posts({ data }) {
    function renderPagination() {
        if (data.data.length <= 0) return;
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
        <>
            {renderPagination()}
            <div className={classnames('col')}>
                {data.data.map(post => <Post key={post.id} controls={false} permalink={true} post={post} />)}
            </div>
            {renderPagination()}
        </>
    );
}
