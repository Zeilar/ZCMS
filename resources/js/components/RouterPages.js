import { FeedbackModalContext } from '../contexts/FeedbackModalContext';
import AdminDashboard from './admin/dashboard/Index';
import FeedbackModal from './misc/FeedbackModal';
import { Route, Switch } from 'react-router';
import AdminRoute from './routes/AdminRoute';
import React, { useContext } from 'react';
import Register from './auth/Register';
import Threads from './thread/Threads';
import Thread from './thread/Thread';
import NotFound from './NotFound';
import Login from './auth/Login';
import Index from './Index';

export default function RouterPages() {
    const { type, message } = useContext(FeedbackModalContext);

    return (
        <>
            <Switch>
                <Route component={Index} path="/" exact />
                <Route component={Threads} path="/category/:category/:page?" exact />
                <Route component={Thread} path="/thread/:thread/" exact />
                <Route component={Login} path="/login" exact />
                <Route component={Register} path="/register" exact />
                <AdminRoute component={AdminDashboard} path="/admin" />
                <Route component={NotFound} />
            </Switch>
            {message && <FeedbackModal message={message} type={type} />}
        </>
    );
}
