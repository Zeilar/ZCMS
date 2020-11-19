import { Redirect, useParams } from 'react-router';
import { createUseStyles } from 'react-jss';
import { useQuery } from 'react-query';
import { Http } from '../../classes';
import { mdiLoading } from '@mdi/js';
import { HttpError } from '../http';
import classnames from 'classnames';
import Icon from '@mdi/react';
import { Header } from './';
import React from 'react';

export default function PostSingle() {
    const styles = createUseStyles({
        icon: {
            color: 'var(--color-main)',
        },
    });
    const classes = styles();

    const { id } = useParams();

    const { data, status } = useQuery(`post-${id}`, async () => {
        const response = await Http.get(`posts/${id}`);
        return response.data;
    });

    if (status === 'error') return <HttpError code={404} />;
    if (status === 'success') return <Redirect to={`/thread/${data.thread.id}/${data.thread.slug}/${data.pageNumber}#${data.id}`} />;

    return (
        <>
            <Header />
            {status === 'loading' && <Icon className={classnames(classes.icon, 'loadingWheel-2 center-self')} path={mdiLoading} spin={1} />}
        </>
    );
}
