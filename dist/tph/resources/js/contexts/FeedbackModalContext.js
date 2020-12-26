import React, { createContext, useState, useEffect } from 'react';

export const FeedbackModalContext = createContext();

export function FeedbackModalContextProvider({ children }) {
    const [type, setType] = useState('error');
    const [message, setMessage] = useState();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage(null);
            setType('error');
        }, 2250);
        return () => {
            clearTimeout(timeout);
        }
    }, [message]);

    return (
        <FeedbackModalContext.Provider value={{ message, setMessage, type, setType }}>
            {children}
        </FeedbackModalContext.Provider>
    );
}
