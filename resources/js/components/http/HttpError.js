import { Knockout } from '../styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import Header from '../Header';
import React from 'react';

export default function HttpError({ code }) {
    const styles = createUseStyles({
        header: {
            fontFamily: 'Montserrat !important',
            fontSize: '4rem',
        },
    });
    const classes = styles();

    let message = '';

    switch (code) {
        case 401:
            message = 'Unauthorized';
            break;

        case 403:
            message = 'Forbidden';
            break;

        case 404:
            message = 'Not Found';
            break;
        
        case 405:
            message = 'Method Not Allowed';
            break;
        
        case 500:
            message = 'Server Error';
            break;
        
        default:
            message = 'Unexpected error';
            break;
    }

    return (
        <>
            <Header />
            <Knockout as="h1" className={classnames(classes.header, 'center-self')}>
                {code ?? ''} {message}
            </Knockout>
        </>
    );
}