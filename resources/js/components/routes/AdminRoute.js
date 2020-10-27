import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Route, Redirect } from 'react-router-dom';

export default function AdminRoute(props) {
    const { user } = useContext(UserContext);

    let isAdmin = false;
    user?.roles.forEach(({ name }) => {
        if (name.toLowerCase() === 'admin') isAdmin = true;
    });

    if (user == null) return 'Loading';

    if (isAdmin) {
        return (
            <Route {...props}>
                {props.children}
            </Route>
        );
    } else {
        return <Redirect to={{
            pathname: '/',
            state: { status: 403 },
        }} />;
    }
}