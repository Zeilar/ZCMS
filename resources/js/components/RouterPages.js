import { ErrorModalContext } from '../contexts/ErrorModalContext';
import AdminDashboard from './admin/dashboard/Index';
import { Route, Switch } from 'react-router';
import AdminRoute from './routes/AdminRoute';
import ErrorModal from './misc/ErrorModal';
import React, { useContext } from 'react';
import Register from './auth/Register';
import Threads from './thread/Threads';
import Thread from './thread/Thread';
import NotFound from './NotFound';
import Login from './auth/Login';
import Index from './Index';

export default function RouterPages() {
    const { error } = useContext(ErrorModalContext);

    return (
        <>
            <Switch>
                <Route component={Index} path="/" exact />
                <Route component={Threads} path="/category/:category" exact />
                <Route component={Thread} path="/thread/:category" exact />
                <Route component={Login} path="/login" exact />
                <Route component={Register} path="/register" exact />
                <AdminRoute component={AdminDashboard} path="/admin" />
                <Route component={NotFound} />
            </Switch>
            {error && <ErrorModal error={error} />}
        </>
    );
}
