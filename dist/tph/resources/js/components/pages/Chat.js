import React, { useState, useEffect, useRef, useContext } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import { FeedbackModalContext } from '../../contexts';
import { Chatbox, Header } from '../layout';
import { createUseStyles } from 'react-jss';
import { Http } from '../../classes';
import classnames from 'classnames';
import { mdiCloseCircle, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

export default function Chat() {
    const styles = createUseStyles({
        wrapper: {
            margin: [0, 'var(--container-margin)'],
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
            '&.active': {
                width: '15rem',
            },
        },
        tabInput: {
            color: 'var(--color-primary)',
            background: 'none',
            border: 0,
            '&:focus': {
                boxShadow: 'none',
            },
        },
        remove: {
            background: 'none',
            border: 0,
            '& svg': {
                width: '1rem',
            },
        },
    });
    const classes = styles();

    const [active, setActive] = useState(JSON.parse(localStorage.getItem('activeChatTab')) ?? tabs[0] ?? '');
    const [tabs, setTabs] = useState(JSON.parse(localStorage.getItem('chatTabs')) ?? []);
    const [tabInput, setTabInput] = useState('');
    const [chats, setChats] = useState([]);

    const { setMessage } = useContext(FeedbackModalContext);

    const [creatingTab, setCreatingTab] = useState(false);
    const [loading, setLoading] = useState(true);

    const tabInputElement = useRef();

    const createTab = useOnclickOutside(() => {
        setCreatingTab(false);
    });

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

    useEffect(() => {
        setActive(tabs[tabs.length - 1] ?? '');
    }, [tabs]);

    useEffect(() => {
        tabInputElement.current?.focus();
    }, [creatingTab]);

    async function add(e) {
        e.preventDefault();

        if (tabs.includes(tabInput)) {
            return;
        }

        setLoading(true);
        const { data, code } = await Http.get(`chatmessages?profile=${tabInput}`);
        setLoading(false);

        if (code === 404) {
            setMessage('User not found');
        }

        if (code === 200) {
            setChats(p => [...p, { tab: tabInput, messages: data }]);
            setTabs(p => [...p, tabInput]);
            setCreatingTab(false);
            setActive(tabInput);
            setTabInput('');
        }
    }

    function remove(tab) {
        setTabs(p => p.filter(element => element !== tab));
        setChats(p => p.filter(chat => chat.tab !== tab));
    }

    return (
        <>
            <Header />
            <div className={classnames(classes.wrapper, 'col mt-4')}>
                <div className={classnames('row overflow-auto pb-2')}>
                    {
                        tabs.map(tab => (
                            <div
                                className={classnames(classes.tab, { active: active === tab }, 'center-children')}
                                onClick={() => setActive(tab)}
                                key={tab}
                            >
                                <span>{tab}</span>
                                {
                                    active === tab &&
                                        <button
                                            className={classnames(classes.remove, 'ml-1 center-children')}
                                            onClick={() => remove(tab)}
                                            type="button"
                                        >
                                            <Icon path={mdiCloseCircle} />
                                        </button>
                                }
                            </div>
                        ))
                    }
                    <form
                        className={classnames(classes.tab, classes.new, 'btn center-children p-0', { active: creatingTab, 'ml-1': tabs.length > 0 })}
                        onClick={() => setCreatingTab(true)} ref={createTab} onSubmit={add}
                    >
                        {!creatingTab && <Icon path={mdiPlus} />}
                        {
                            creatingTab &&
                                <input
                                    className={classnames(classes.tabInput, 'bold')}
                                    onChange={e => setTabInput(e.target.value)}
                                    ref={tabInputElement}
                                    value={tabInput}
                                />
                        }
                    </form>
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
