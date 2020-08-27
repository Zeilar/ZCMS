import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './Admin/AdminDashboard';
import React, { useState, useEffect } from 'react';
import PopupModal from './Modals/PopupModal';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Logout from './Logout';
import Login from './Login';
import Main from './Main';

export default function App() {
    const [adminDashboard, setAdminDashboard] = useState(false);
    const [popupContent, setPopupContent] = useState({});
    const [popup, setPopup] = useState(false);
    const [users, setUsers] = useState();
    const [user, setUser] = useState();

    async function authenticate() {
        await fetch('/api/authenticate', { method: 'POST' })
            .then(response => {
                if (response.status === 401) return false;
                return response.json();
            })
            .then(({ user }) => {
                if (user) setUser(user);
            });
    }

    useEffect(() => {
        if (user == null) authenticate();
    }, [user]);

    return (
        <Router>
            {popup && <PopupModal setActive={setPopup} message={popupContent.message} type={popupContent.type} title={popupContent.title} />}
            <Navbar user={user} users={users} setUsers={setUser} adminDashboard={adminDashboard} setAdminDashboard={setAdminDashboard} />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={() => <Login user={user} setUser={setUser} setPopup={setPopup} setPopupContent={setPopupContent} />} />
                <Route path="/logout" component={() => <Logout setUser={setUser} setPopup={setPopup} setPopupContent={setPopupContent} />} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}