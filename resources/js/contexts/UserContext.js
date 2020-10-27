import React, { createContext, useState, useEffect } from 'react';
import Http from '../classes/Http';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(async () => {
        setUser(await Http.get('authenticate'));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
