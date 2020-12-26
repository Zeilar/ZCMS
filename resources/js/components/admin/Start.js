import React, { useState, useEffect, useContext } from 'react';
import { errorCodeHandler } from '../../functions/helpers';
import { AdminStatisticBox } from '../styled-components';
import { FeedbackModalContext } from '../../contexts';
import { createUseStyles } from 'react-jss';
import { Http } from '../../classes';
import classnames from 'classnames';
import CountUp from 'react-countup';

export default function Start() {
    const styles = createUseStyles({
        
    });
    const classes = styles();

    const [threads, setThreads] = useState(0);
    const [users, setUsers] = useState(0);
    const [posts, setPosts] = useState(0);

    const { setMessage } = useContext(FeedbackModalContext);

    async function getStatistic(endpoint = '', setState) {
        const { code, data } = await Http.get(`admin/statistics/${endpoint}`);
        errorCodeHandler(code, message => setMessage(message), () => setState(data));
    }
    
    useEffect(() => {
        getStatistic('threads', setThreads);
        getStatistic('posts', setPosts);
        getStatistic('users', setUsers);

        window.Echo.channel('admin-statistics')
            .listen('CreatedThread', () => setThreads(p => p + 1))
            .listen('DeletedThread', () => setThreads(p => p - 1))
            .listen('CreatedPost', () => setPosts(p => p + 1))
            .listen('DeletedPost', () => setPosts(p => p - 1))
            .listen('CreatedUser', () => setUsers(p => p + 1))
            .listen('DeletedUser', () => setUsers(p => p - 1));
    }, []);

    return (
        <div className={classnames('row')}>
            <AdminStatisticBox className={classnames('mr-4')}>
                <p>Users</p>
                <CountUp end={users} duration={2} />
            </AdminStatisticBox>
            <AdminStatisticBox className={classnames('mr-4')}>
                <p>Threads</p>
                <CountUp end={threads} duration={2} />
            </AdminStatisticBox>
            <AdminStatisticBox>
                <p>Posts</p>
                <CountUp end={posts} duration={2} />
            </AdminStatisticBox>
        </div>
    );
}
