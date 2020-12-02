import React, { useState, useEffect } from 'react';
import { Chatbox, Header } from '../layout';
import { createUseStyles } from 'react-jss';
import { Http } from '../../classes';
import classnames from 'classnames';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

export default function Chat() {
    const styles = createUseStyles({
        wrapper: {
            margin: [0, 'var(--container-margin)'],
        },
        tabs: {
            marginBottom: 1,
        },
        tab: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            cursor: 'pointer',
            borderRadius: 3,
            marginRight: 1,
            padding: 10,
            '&:last-child': {
                marginRight: 0,
            },
            '&.active': {
                backgroundImage: 'var(--color-main-gradient)',
                color: 'var(--color-primary)',
                fontWeight: 'bold',
                cursor: 'default',
            },
        },
        new: {
            minWidth: 'unset',
            width: '2.5rem',
            marginLeft: 5,
        },
    });
    const classes = styles();

    const [active, setActive] = useState(JSON.parse(localStorage.getItem('activeChatTab')) ?? '');
    const [tabs, setTabs] = useState(JSON.parse(localStorage.getItem('chatTabs')) ?? []);
    const [loading, setLoading] = useState(true);
    const [newTab, setNewTab] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const chats = [];
        tabs.forEach(async tab => {
            const { data, code } = await Http.get(`chatmessages?profile=${tab}`);
            if (code === 200) {
                chats.push({ tab: tab, messages: data });
            } else {
                setTabs(p => p.filter(element => element !== tab));
            }
        });
        setLoading(false);
        setChats(chats);
    }, []);

    useEffect(() => {
        localStorage.setItem('activeChatTab', JSON.stringify(active));
        localStorage.setItem('chatTabs', JSON.stringify(tabs));
    }, [tabs, active]);

    async function add(tab = '') {
        if (tabs.includes(tab)) {
            return;
        }

        setLoading(true);
        const { data } = await Http.get(`chatmessages?profile=${tab}`);
        setLoading(false);
        
        setChats(p => [...p, { tab: tab, messages: data }]);
        setTabs(p => [...p, tab]);
        setActive(tab);
    }

    function remove(tab) {
        setTabs(p => p.filter(element => element !== tab));
        setChats(p => p.filter(chat => chat.tab !== tab));
    }

    return (
        <>
            <Header />
            <div className={classnames(classes.wrapper, 'col mt-4')}>
                <div className={classnames(classes.tabs, 'row')}>
                    {
                        tabs.map(tab => (
                            <div className={classnames(classes.tab, { active: active === tab })} key={tab} onClick={() => setActive(tab)}>
                                {tab}
                            </div>
                        ))
                    }
                    <button className={classnames(classes.tab, classes.new, 'btn center-children p-0')}>
                        <Icon path={mdiPlus} />
                    </button>
                </div>
                <Chatbox
                    messages={chats.find(chat => chat.tab === active)?.messages}
                    style={{ height: 800 }}
                    setChats={setChats}
                    receiver={active}
                    loading={loading}
                />
            </div>
        </>
    );
}
