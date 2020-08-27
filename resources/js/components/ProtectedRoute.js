import { Route, Redirect, useHistory } from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const history = useHistory();

    if (localStorage.getItem('user')) {
        return <Route {...rest} render={
            (props) => {
                return <Component {...props} />;
            }
        } />
    } else {
        rest.setPopupContent({
            message: 'Please log in first.',
            title: '401 Unauthorized',
            type: 'error',
        });
        rest.setPopup(true);
        return <Redirect push to={history.goBack() ?? '/'} />
    }
}