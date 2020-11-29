import React, { useContext, useState, useEffect } from 'react';
import { errorCodeHandler } from '../../functions/helpers';
import { UserContext } from '../../contexts';
import { useParams } from 'react-router';
import Chatbox from '../layout/Chatbox';
import { mdiLoading } from '@mdi/js';
import { Http } from '../../classes';
import Icon from '@mdi/react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const { id } = useParams();

    useEffect(async () => {
        const { data } = await Http.get(`chatmessages?profile=${id}`);
        setLoading(false);
        setMessages(data);
    }, []);

    if (loading) {
        return <Icon className="loadingWheel-2 center-self" path={mdiLoading} spin={1} />
    }

    async function send(input, setInput) {
        const formData = new FormData();
        formData.append('content', input);
        formData.append('receiverId', id);
        const { code } = await Http.post('chatmessages', { body: formData });
        errorCodeHandler(code, message => setMessage(message), () => {
            setInput('');
            setMessages(p => [...p, {
                created_at: new Date(),
                id: Math.random(),
                user_id: user.id,
                receiver_id: id,
                content: input,
                user: user,
            }]);
        });
    }

    return <Chatbox messages={messages} style={{ height: 800 }} onSubmit={send} />;
}
