import Unauthorized from './Unauthorized';
import { Route } from 'react-router-dom';
import Loading from './Loading';
import React from 'react';

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={
            (props) => {
                if (localStorage.getItem('user')) {
                    return <Component {...props} />;
                } else {
                    console.log('forbidden');
                    return <Unauthorized />;
                }
            }
        } />
    );
}