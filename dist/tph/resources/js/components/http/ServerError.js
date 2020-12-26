import { Knockout } from '../styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import Header from '../Header';
import React from 'react';

export default function ServerError() {
    const styles = createUseStyles({
        header: {
            fontSize: '4rem',
        },
    });
    const classes = styles();

    return (
        <>
            <Header />
            <Knockout className={classnames(classes.header, 'center-self')}>
                500 Server Error
            </Knockout>
        </>
    );
}
