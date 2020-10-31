import { UserContext } from '../../contexts/UserContext';
import React, { useContext } from 'react';
import Forbidden from '../http/Forbidden';
import { Route } from 'react-router-dom';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export default function AdminRoute(props) {
    const { user } = useContext(UserContext);

    let isAdmin = false;
    user?.roles?.forEach(({ name }) => {
        if (name.toLowerCase() === 'admin') isAdmin = true;
    });

    if (user == null) return <Icon className="loadingWheel-4" path={mdiLoading} spin={1} />;

    if (isAdmin) {
        return (
            <Route {...props}>
                {props.children}
            </Route>
        );
    } else {
        return <Forbidden />;
    }
}
