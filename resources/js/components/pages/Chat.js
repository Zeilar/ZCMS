import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Chatbox, Header } from '../layout';
import { useQuery } from 'react-query';
import { Http } from '../../classes';
import classnames from 'classnames';

export default function Chat() {
    const styles = createUseStyles({
        wrapper: {
            margin: [0, 'var(--container-margin)'],
        },
    });
    const classes = styles();

    const [tabs, setTabs] = useState(JSON.parse(localStorage.getItem('chatTabs')) ?? []);
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);

    useEffect(async () => {
        const chats = [];
        tabs.forEach(async tab => {
            const { data, code } = await Http.get(`chatmessages?profile=${tab.id}`);
            if (code === 200) {
                chats.push({ id: tab.id, messages: data });
            } else {
                setTabs(p => p.filter(element => element !== tab));
            }
        });
        setLoading(false);
        setChats(chats);
    }, []);

    useEffect(() => {
        localStorage.setItem('chatTabs', JSON.stringify(tabs));
    }, [tabs]);

    const activeTab = () => tabs.find(tab => tab.active) ? tabs.find(tab => tab.active).id : null;

    async function add(id = '', active = true) {
        if (tabs.find(tab => tab.id === id)) {
            return;
        }

        setLoading(true);
        const { data } = await Http.get(`chatmessages?profile=${id}`);
        setLoading(false);

        const tab = {
            id: id,
            active: active,
        };
        
        setChats(p => [...p, { id: id, messages: data }]);
        setTabs(p => {
            let old = p;
            const newArr = old.map(element => {
                if (element.active && element.id !== tab.id) {
                    element.active = false;
                }
                return element;
            });
            return [...newArr, tab];
        });
    }

    function remove(id) {
        setChats(p => p.filter(chat => chat.id !== id));
        setTabs(p => p.filter(tab => tab.id !== id));
    }

    function change(id) {
        setTabs(p => {
            let old = p;
            return old.map(element => {
                if (element.active && element.id !== id) {
                    element.active = false;
                }
                return element;
            });
        });
    }

    return (
        <>
            <Header />
            <div className={classnames(classes.wrapper, 'col mt-4')}>
                <button onClick={() => add('user')}>change</button>
                <Chatbox style={{ height: 800 }} messages={chats.find(chat => chat.id === activeTab())?.messages} loading={loading} />
            </div>
        </>
    );
}
