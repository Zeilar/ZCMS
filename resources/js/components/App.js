import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PopupModal from './Modals/PopupModal';
import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import Landing from './Landing';
import Navbar from './Navbar';
import Logout from './Logout';
import Login from './Login';

export default function App() {
    // fetch("/post/5", {method: 'DELETE'})
    //     .then(response => {
    //         console.log('RESPONSE', response);
    //         if (response.status == 200) {
    //             console.log('All went fine');
    //         } else {
    //             console.log('ERROR!', response);
    //         }
    //     });

    const [popupContent, setPopupContent] = useState({});
    const [popup, setPopup] = useState(false);

    return (
        <Router>
            <Navbar />
            {popup && <PopupModal setActive={setPopup} message={popupContent.message} type={popupContent.type} title={popupContent.title} />}
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={() => <Logout popup={popup} setPopup={setPopup} setPopupContent={setPopupContent} />} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}