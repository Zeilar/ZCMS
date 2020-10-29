import ErrorModalContextProvider from '../contexts/ErrorModalContext';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from '../contexts/UserContext';
import RouterPages from './RouterPages';
import React from 'react';

export default function App() {
    return (
        <Router>
            <ErrorModalContextProvider>
                <UserContextProvider>
                    <RouterPages />
                </UserContextProvider>
            </ErrorModalContextProvider>
        </Router>
    );
}
