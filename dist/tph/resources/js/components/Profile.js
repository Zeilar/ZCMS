import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { mdiLoading } from '@mdi/js';
import classnames from 'classnames';
import Http from '../classes/Http';
import Header from './Header';
import Icon from '@mdi/react';
import { render } from 'react-dom';

export default function Profile() {
    const styles = createUseStyles({
        container: {
            margin: [0, 'var(--container-margin)'],
        },
        avatar: {
            width: 100,
        },
        loading: {
            color: 'var(--color-main)',
        },
        username: {
            fontFamily: 'Merriweather',
        },
    });
    const classes = styles();

    const { id } = useParams();
    const { data, status } = useQuery(`user-${id}`, async () => {
        const response = await Http.get(`users/${id}`);
        return response.data;
    });

    const render = () => {
        if (status === 'loading') return <Icon className={classnames(classes.loading, 'loadingWheel-3 center-self')} path={mdiLoading} spin={1} />
        return (
            <div className={classnames(classes.container, 'mt-5')}>
                <div className={classnames('col center-children')}>
                    <img className={classnames(classes.avatar, 'round')} src={`/storage/avatars/${data?.avatar}`} alt="Profile avatar" />
                    <h1 className={classnames(classes.username, 'mt-3')}>{data.username}</h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            {render()}
        </>
    );
}