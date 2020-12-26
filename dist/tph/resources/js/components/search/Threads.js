import { Pagination } from '../misc';
import classnames from 'classnames';
import { Thread } from '../layout';
import React from 'react';

export default function Threads({ data }) {
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
                {data.data.map(thread => <Thread key={thread.id} thread={thread} />)}
            </div>
            {renderPagination()}
        </>
    );
}
