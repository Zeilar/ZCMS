import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Route } from 'react-router-dom';

export default function AuthRoute(props) {
    const { user } = useContext(UserContext);

    if (user == null) return 'Loading';

    if (user) {
        return (
            <Route {...props}>
                {props.children}
            </Route>
        );
    } else {
        return <Redirect to={{
            pathname: '/',
            state: { status: 401 },
        }} />;
    }
}