import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import React, { useState } from 'react';
import Landing from './Landing';
import Login from './Login';

export default function App() {
    const [user, setUser] = useState();

    return (
        <Router>
            <Switch>
                <ProtectedRoute exact path="/login" component={() => <Login user={user} setUser={setUser} />} />
                <Route exact path="/" component={Landing} />
                {user ? <NavLink to="/login">Login</NavLink> : ''}
                <Route path='*' component={() => '404 Not found'} />
            </Switch>
        </Router>
    );
}