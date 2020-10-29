import { ErrorModalContext } from '../contexts/ErrorModalContext';
import AdminDashboard from './admin/dashboard/Index';
import { Route, Switch } from 'react-router';
import AdminRoute from './routes/AdminRoute';
import ErrorModal from './misc/ErrorModal';
import React, { useContext } from 'react';
import NotFound from './NotFound';
import Index from './Index';

export default function RouterPages() {
    const { error } = useContext(ErrorModalContext);

    return (
        <>
            <Switch>
                <Route component={Index} path="/" exact />
                <AdminRoute component={AdminDashboard} path="/admin" />
                <Route component={NotFound} />
            </Switch>
            {error && <ErrorModal error={error} />}
        </>
    );
}