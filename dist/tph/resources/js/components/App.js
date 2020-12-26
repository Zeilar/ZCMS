import { FeedbackModalContextProvider, UserContextProvider } from '../contexts';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterPages from './pages/RouterPages';
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
