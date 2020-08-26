import { Route, Redirect, useHistory } from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const history = useHistory();

    return (
        <Route {...rest} render={
            (props) => {
                if (localStorage.getItem('user')) {
                    return <Component {...props} />;
                } else {
                    return <Redirect push to={
                        {
                            pathname: history.goBack(),
                            state: {
                                message: 'Access unauthorized.',
                                type: 'error',
                                title: 401,
                            }
                        }
                    } />
                }
            }
        } />
    );
}