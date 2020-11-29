import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Chatbox from '../layout/Chatbox';
import { mdiLoading } from '@mdi/js';
import { Http } from '../../classes';
import Icon from '@mdi/react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(async () => {
        const { data } = await Http.get(`chatmessages?profile=${id}`);
        setLoading(false);
        setMessages(data);
    }, []);

    if (loading) {
        return <Icon className="loadingWheel-2 center-self" path={mdiLoading} spin={1} />
    }

    return <Chatbox messages={messages} setMessages={setMessages} receiver={id} style={{ height: 800 }} />;
}
