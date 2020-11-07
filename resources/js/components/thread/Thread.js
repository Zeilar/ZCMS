import React, { useState, useEffect } from 'react';
import { mdiArrowLeft, mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import Pagination from '../misc/Pagination';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import Http from '../../classes/Http';
import Post from '../layout/Post';
import Header from '../Header';
import Icon from '@mdi/react';

export default function Threads() {
    const styles = createUseStyles({
        container: {
            padding: [0, 'var(--container-margin)'],
        },
        header: {

        },
        headerText: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.25)'],
            backgroundImage: 'var(--color-main-gradient)',
            color: 'var(--color-primary)',
            alignItems: 'center',
            borderRadius: 2,
            padding: 15,
        },
        back: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.25)'],
            backgroundImage: 'var(--color-main-gradient)',
            color: 'var(--color-primary)',
            borderRadius: 2,
            padding: 15,
            '&:hover': {
                color: 'var(--color-primary)',
            },
        },
        posts: {
            minHeight: 100,
        },
        post: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.1s linear',
            alignItems: 'center',
            borderRadius: 2,
            padding: 15,
            '&:hover': {
                backgroundColor: 'var(--bg-color)',
            }
        },
    });
    const classes = styles();

    const [postsLoaded, setPostsLoaded] = useState(false);
    const [pagination, setPagination] = useState({});
    const [dbThread, setDbThread] = useState();
    const [posts, setPosts] = useState([]);
    const { thread, page } = useParams();

    useEffect(async () => {
        if (thread) {
            setPostsLoaded(false);
            const response = await Http.get(`posts?thread=${thread}&getAuthor=true&getPostMeta=true&page=${page}`);
            if (response.code === 200) {
                setPosts(response.data.data);
                const pagination = response.data;
                setPagination({
                    currentPage: pagination.current_page,
                    lastPage: pagination.last_page,
                    perPage: pagination.per_page,
                    total: pagination.total,
                });
            }
        }
        setPostsLoaded(true);
        window.scrollTo(0, 0);
    }, [thread, page]);

    useEffect(async () => {
        const response = await Http.get(`threads/${thread}?getCategory=true`);
        if (response.code === 200) {
            setDbThread(response.data);
        } else {
            setDbThread(false);
        }
    }, [thread]);

    const renderThreads = () => {
        if (!postsLoaded) {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        } else {
            if (posts.length <= 0) {
                return <p className="text-center">No posts were found</p>;
            } else {
                return posts.map(post => <Post key={post.id} post={post} />);
            }
        }
    }

    return (
        <>
            <Header />
            <div className={`${classes.container} py-4`}>
                <div className={`${classes.header} row mb-2`}>
                    <NavLink className={`${classes.back} d-flex mr-2`} to={`/category/${dbThread?.category.name.toLowerCase()}`}>
                        <Icon path={mdiArrowLeft} />
                    </NavLink>
                    <h2 className={`${classes.headerText} row w-100`}>{dbThread?.title}</h2>
                </div>
                <div className={`${classes.posts} col relative`}>
                    {renderThreads()}
                    {posts.length > 0 && postsLoaded && <Pagination pagination={pagination} />}
                </div>
            </div>
        </>
    );
}