import { Redirect, useParams } from 'react-router';
import { createUseStyles } from 'react-jss';
import NotFound from '../http/NotFound';
import { useQuery } from 'react-query';
import Http from '../../classes/Http';
import { mdiLoading } from '@mdi/js';
import classnames from 'classnames';
import Header from '../Header';
import Icon from '@mdi/react';
import React from 'react';

export default function PostSingle() {
    const styles = createUseStyles({
        icon: {
            color: 'var(--color-main)',
            width: 50,
        },
    });
    const classes = styles();

    const { id } = useParams();

    const { data, status } = useQuery(`post-${id}`, async () => {
        const response = await Http.get(`posts/${id}`);
        return response.data;
    });

    if (status === 'error') return <NotFound />;
    if (status === 'success') return <Redirect to={`/thread/${data.thread.id}/${data.thread.slug}/${data.pageNumber}#${data.id}`} />;

    return (
        <>
            <Header />
            {status === 'loading' && <Icon className={classnames(classes.icon, 'center-self')} path={mdiLoading} spin={1} />}
        </>
    );
}
