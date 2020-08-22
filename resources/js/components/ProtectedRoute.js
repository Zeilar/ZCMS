import Unauthorized from './Unauthorized';
import { Route } from 'react-router-dom';
import React, { useState } from 'react';
import Auth from '../classes/Auth';
import Loading from './Loading';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [checked, setChecked] = useState(false);

    Auth.authenticate(setAuthenticated, setChecked);

    return (
        <Route {...rest} render={
            (props) => {
                if (!checked) return <Loading />;
                if (authenticated) {
                    return <Component {...props} />;
                } else {
                    return <Unauthorized />;
                }
            }
        } />
    );
}