import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import Landing from './Landing';
import Logout from './Logout';
import Login from './Login';
import React from 'react';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}