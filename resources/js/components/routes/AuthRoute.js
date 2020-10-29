import { UserContext } from '../../contexts/UserContext';
import Unauthorized from '../http/Unauthorized';
import React, { useContext } from 'react';
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
        return <Unauthorized />
    }
}
