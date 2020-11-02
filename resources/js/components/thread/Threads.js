import React, { useState, useRef, useEffect } from 'react';
import { mdiEye, mdiForum, mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import Tooltip from '../misc/Tooltip';
import Http from '../../classes/Http';
import Header from '../Header';
import Icon from '@mdi/react';

export default function Threads() {
    const styles = createUseStyles({
        threads: {
            margin: [0, 'var(--container-margin)'],
        },
        thread: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            alignItems: 'center',
            padding: 15,
        },
        title: {
            width: '50%',
        },
        posts: {
            
        },
        views: {
            marginLeft: '7.5%',
        },
        latest: {
            position: 'relative',
            width: '20%',
        },
        latestLink: {
            
        },
    });
    const classes = styles();

    const [threadsLoaded, setThreadsLoaded] = useState(false);
    const [threads, setThreads] = useState([]);
    const { category } = useParams();
    const header = useRef();

    console.log(header);

    function calculateMinHeight() {
        console.log(header.current);
    }

    useEffect(async () => {
        if (category) {
            const response = await Http.get(`threads?category=${category}`);
            if (response.code === 200) setThreads(response.data);
        } else {
            setThreads(null);
        }
        setThreadsLoaded(true);
    }, [category]);

    useEffect(() => {
        calculateMinHeight();
    });
    
    const render = () => {
        if (!threadsLoaded) {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        } else {
            if (threads.length <= 0) {
                return <p className="text-center">No threads were found, be the first to create one!</p>;
            } else {
                return threads.map(thread => (
                    <div className={`${classes.thread} rounded row mb-3`} key={thread.id}>
                        <p className={classes.title}>
                            <NavLink to={`/thread/${thread.slug}`}>
                                {thread.title}
                            </NavLink>
                        </p>
                        <Tooltip tagName="div" className={`${classes.posts} ml-auto col center-children`} title="Posts">
                            <Icon path={mdiForum} />
                            <span>{thread.postsAmount}</span>
                        </Tooltip>
                        <Tooltip tagName="div" className={`${classes.views} mr-auto col center-children`} title="Views">
                            <Icon path={mdiEye} />
                            <span>{thread.views}</span>
                        </Tooltip>
                        <div className={`${classes.latest} col`} title="Latest post">
                            <span className={`${classes.latestDate} ml-auto`}>
                                Some date
                            </span>
                            <NavLink className={`${classes.latestLink} ml-auto`} to={`/thread/${thread.slug}/#${thread.latestPost.id}`}>
                                By {thread.latestPost.user.username}
                            </NavLink>
                        </div>
                    </div>
                ));
            }
        }
    }

    return (
        <>
            <Header forwardRef={header} />
            <div className={`${classes.threads} col relative`} style={{ minHeight: !threadsLoaded && 500 }}>
                {render()}
            </div>
        </>
    );
}