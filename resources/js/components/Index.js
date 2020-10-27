import React, { useState, useRef, useEffect } from 'react';
import Unauthorized from './http/Unauthorized';
import { createUseStyles } from 'react-jss';
import Forbidden from './http/Forbidden';
import Header from './Header';

export default function Index(props) {
    switch (props.location.state?.status) {
        case 401:
            return <Unauthorized />;
        case 403:
            return <Forbidden />;
        default:
            break;
    }

    return (
        <>
            <Header />
            Index
        </>
    );
}