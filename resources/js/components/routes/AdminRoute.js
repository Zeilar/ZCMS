import { UserContext } from '../../contexts';
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { mdiLoading } from '@mdi/js';
import { HttpError } from '../http';
import Icon from '@mdi/react';

export default function AdminRoute({ children, ...props }) {
    const { user } = useContext(UserContext);

    if (user == null) return <Icon className=" center-self loadingWheel-4" path={mdiLoading} spin={1} />;

    const isAdmin = () => {
        for (let i = 0; i < user.roles.length; i++) {
            if (user.roles[i].name.toLowerCase() === 'admin') {
                return true;
            }
        }
        return false;
    }

    if (isAdmin()) {
        return (
            <Route {...props}>
                {children}
            </Route>
        );
    } else {
        return <HttpError code={403} />;
    }
}
