import { NewThread, Category, Thread } from '../threads';
import { FeedbackModalContext } from '../../contexts';
import AdminDashboard from '../admin/dashboard/Index';
import { ScrollToTop, FeedbackModal } from '../misc';
import { Register, Login, Logout } from '../auth';
import { Route, Switch } from 'react-router';
import React, { useContext } from 'react';
import { PostSingle } from '../layout';
import { AdminRoute } from '../routes';
import { Profile } from '../profile';
import { HttpError } from '../http';
import { Home } from './';

export default function RouterPages() {
    const { type, message } = useContext(FeedbackModalContext);

    return (
        <>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={PostSingle} path="/post/:id" exact />
                <Route component={Profile} path="/user/:id/:tab?/:page?" exact />
                <Route component={NewThread} path="/category/:category/new" exact />
                <Route component={Category} path="/category/:category/:page?" exact />
                <Route component={Thread} path="/thread/:id/:slug?/:page?" exact />
                <Route component={Login} path="/login" exact />
                <Route component={Logout} path="/logout" exact />
                <Route component={Register} path="/register" exact />
                <AdminRoute component={AdminDashboard} path="/admin" />
                <Route>
                    <HttpError code={404} />
                </Route>
            </Switch>
            {message && <FeedbackModal message={message} type={type} />}
            <ScrollToTop />
        </>
    );
}
