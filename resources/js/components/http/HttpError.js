import Unauthorized from './Unauthorized';
import ServerError from './ServerError';
import Forbidden from './Forbidden';
import NotFound from './NotFound';
import React from 'react';

export default function HttpError({ code }) {
    switch (code) {
        case 404:
            return <NotFound />;
        
        case 401:
            return <Unauthorized />

        case 403:
            return <Forbidden />
        
        default:
            return <ServerError />;
    }
}