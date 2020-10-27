import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from '../contexts/userContext';
import RouterPages from './RouterPages';
import React from 'react';

export default function App() {
    return (
        <Router>
            <UserContextProvider>
                <RouterPages />
            </UserContextProvider>
        </Router>
    );
}
