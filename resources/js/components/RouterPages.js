import { FeedbackModalContext } from '../contexts/FeedbackModalContext';
import AdminDashboard from './admin/dashboard/Index';
import FeedbackModal from './misc/FeedbackModal';
import { Route, Switch } from 'react-router';
import AdminRoute from './routes/AdminRoute';
import ScrollToTop from './misc/ScrollToTop';
import NewThread from './thread/NewThread';
import React, { useContext } from 'react';
import Category from './thread/Category';
import Register from './auth/Register';
import NotFound from './http/NotFound';
import Thread from './thread/Thread';
import Login from './auth/Login';
import Index from './Index';

export default function RouterPages() {
    const { type, message } = useContext(FeedbackModalContext);

    return (
        <>
            <Switch>
                <Route component={Index} path="/" exact />
                <Route component={NewThread} path="/category/:category/new" exact />
                <Route component={Category} path="/category/:category/:page?" exact />
                <Route component={Thread} path="/thread/:id/:slug?/:page?" exact />
                <Route component={Login} path="/login" exact />
                <Route component={Register} path="/register" exact />
                <AdminRoute component={AdminDashboard} path="/admin" />
                <Route component={NotFound} />
            </Switch>
            {message && <FeedbackModal message={message} type={type} />}
            <ScrollToTop />
        </>
    );
}
