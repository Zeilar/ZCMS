import { UserContext } from '../../contexts';
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { mdiLoading } from '@mdi/js';
import { HttpError } from '../http';
import Icon from '@mdi/react';

export default function AuthRoute({ children, ...props }) {
    const { user } = useContext(UserContext);

    if (user == null) {
        return <Icon className="loadingWheel-4" path={mdiLoading} spin={1} />;
    }

    if (!user) {
        return <HttpError code={401} />;
    }

    if (user.suspended) {
        return <HttpError code={403} />;
    }

    return (
        <Route {...props}>
            {children}
        </Route>
    );
}
