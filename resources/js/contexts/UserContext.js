import React, { createContext, useState, useEffect } from 'react';
import Http from '../classes/Http';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(async () => {
        const response = await Http.get('authenticate');
        setUser(response.code === 200 ? response.data : false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
