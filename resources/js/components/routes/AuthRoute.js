import { UserContext } from '../../contexts/UserContext';
import HttpError from '../http/HttpError';
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export default function AuthRoute({ children, ...props }) {
    const { user } = useContext(UserContext);

    if (user == null) return <Icon className="loadingWheel-4" path={mdiLoading} spin={1} />;

    if (user) {
        return (
            <Route {...props}>
                {children}
            </Route>
        );
    } else {
        return <HttpError code={401} />
    }
}
