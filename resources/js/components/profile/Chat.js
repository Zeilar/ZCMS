import { useParams } from 'react-router';
import Chatbox from '../layout/Chatbox';
import { useQuery } from 'react-query';
import { mdiLoading } from '@mdi/js';
import { Http } from '../../classes';
import Icon from '@mdi/react';
import React from 'react';

export default function Chat() {
    const { id } = useParams();

    const { data, status } = useQuery(`chat-${id}`, async () => {
        const { data } = await Http.get(`chatmessages?profile=${id}`);
        return data;
    });

    if (status === 'loading') {
        return <Icon className="loadingWheel-2 center-self" path={mdiLoading} spin={1} />
    }

    if (status === 'error') {
        return <p className="text-center color-danger mt-2">Something went wrong loading the chat</p>;
    }

    function test(input) {
        console.log(input);
    }

    return <Chatbox messages={data} style={{ height: 500 }} onSubmit={test} />;
}
