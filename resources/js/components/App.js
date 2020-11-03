import FeedbackModalContextProvider from '../contexts/FeedbackModalContext';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from '../contexts/UserContext';
import RouterPages from './RouterPages';
import React from 'react';

export default function App() {
    return (
        <Router>
            <FeedbackModalContextProvider>
                <UserContextProvider>
                    <RouterPages />
                </UserContextProvider>
            </FeedbackModalContextProvider>
        </Router>
    );
}
