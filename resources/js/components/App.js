import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import React, { useState } from 'react';
import NotFound from './NotFound';
import Landing from './Landing';
import Navbar from './Navbar';
import Login from './Login';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/login' component={Login} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}