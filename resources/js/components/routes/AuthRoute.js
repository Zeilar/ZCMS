import { UserContext } from '../../contexts/UserContext';
import Unauthorized from '../http/Unauthorized';
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export default function AuthRoute(props) {
    const { user } = useContext(UserContext);

    if (user == null) return <Icon className="loadingWheel-4" path={mdiLoading} spin={1} />;

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
