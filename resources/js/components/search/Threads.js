import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { Thread } from '../layout';
import { Pagination } from '../misc';

export default function Threads({ data }) {
    function renderPagination() {
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
