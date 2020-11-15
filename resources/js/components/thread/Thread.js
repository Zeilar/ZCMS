import { FeedbackModalContext } from '../../contexts/FeedbackModalContext';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useHistory, useParams } from 'react-router';
import { mdiArrowLeft, mdiLoading } from '@mdi/js';
import MdEditor from 'react-markdown-editor-lite';
import { createUseStyles } from 'react-jss';
import Pagination from '../misc/Pagination';
import { NavLink } from 'react-router-dom';
import HttpError from '../http/HttpError';
import { useQuery } from 'react-query';
import EditThread from './EditThread';
import Http from '../../classes/Http';
import classnames from 'classnames';
import Post from '../layout/Post';
import Header from '../Header';
import Icon from '@mdi/react';
import marked from 'marked';

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
            fontSize: '1.5rem',
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
        editor: {
            width: 'calc(100% - (var(--container-margin) * 2))',
            transition: 'all 0.25s linear',
            width: '100%',
        },
        submit: {
            fontSize: '1.15rem',
        },
        submitIcon: {
            width: 15,
        },
        editorError: {
            color: 'var(--color-danger)',
        },
        loadingSpinner: {
            color: 'var(--color-main)',
            width: 50,
        },
    });
    const classes = styles();

    const { setMessage } = useContext(FeedbackModalContext);
    const [editorContent, setEditorContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [httpError, setHttpError] = useState(false);
    const [editorError, setEditorError] = useState();
    const [channel, setChannel] = useState();
    const { user } = useContext(UserContext);
    const { id, page } = useParams();
    const history = useHistory();
    const reply = useRef();

    const posts = useQuery([page, `thread-${id}`], async (page) => {
        const response = await Http.get(`posts?thread=${id}&page=${page ?? 1}`);
        if (response.code !== 200) return setHttpError(response.code);
        setHttpError(false);
        return response.data;
    });

    const dbThread = useQuery(`dbThread-${id}`, async () => {
        const response = await Http.get(`threads/${id}?getCategory=true`);
        if (response.code !== 200) return setHttpError(response.code);
        return response.data;
    });

    function canPost() {
        if (!user || user.suspended) return false;
        if (user.roles[0].clearance <= 3) return true;
        if (dbThread.data?.locked) return false;
        return user ? true : false;
    }

    async function submitPost(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', editorContent);
        formData.append('threadId', dbThread.data?.id);
        setSubmitting(true);
        const response = await Http.post('posts', { body: formData });
        setSubmitting(false);
        if (response.code === 422) setEditorError(response.data.errors.content);
        if (response.code === 200) {
            setEditorContent('');
            const thread = dbThread.data;
            const post = response.data;
            history.push(`/thread/${thread.id}/${thread.slug}/${post.pageNumber}#${post.id}`)
        }
    }

    function goToReply() {
        window.scrollTo(0, reply.current?.getBoundingClientRect().top - window.scrollY);
    }

    function quote(post) {
        setEditorContent(p => p + `> ${post.content}<br /><br />[Visit post](/post/${post.id})`);
    }

    function canModify() {
        if (!user || user.suspended) return false;
        if (user.roles[0].clearance <= 3) return true;
        return false;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id, page]);

    useEffect(() => {
        if (dbThread.status === 'success' && channel == null) {
            const channel = window.Echo.join(`thread-${dbThread.data?.id}`).listen('NewPost', () => {
                console.log('refetch'); // TODO: one liner
                posts.refetch()
            });
            setChannel(channel);
        }
    }, [dbThread]);

    if (httpError) return <HttpError code={httpError} />

    const paginationRender = () => {
        if (posts.status !== 'success') return;
        return (
            <Pagination pagination={{
                currentPage: posts.data.current_page,
                lastPage: posts.data.last_page,
                perPage: posts.data.per_page,
                total: posts.data.total,
            }} />
        );
    }

    const render = () => {
        if (dbThread.status === 'loading') {
            return <Icon className={classnames(classes.loadingSpinner, 'm-auto')} path={mdiLoading} spin={1} />
        }
        return <>
            {dbThread.status === 'success' && canModify() && <EditThread thread={dbThread.data} refetch={dbThread.refetch} />}
            <div className={`${classes.header} row mb-2`}>
                <NavLink className={`${classes.back} d-flex mr-2`} to={`/category/${dbThread.data?.category.name.toLowerCase()}`}>
                    <Icon path={mdiArrowLeft} />
                </NavLink>
                <h2 className={`${classes.headerText} w-100`}>
                    {dbThread.status === 'loading' ? <span style={{ color: 'transparent' }}>Loading</span> : dbThread.data?.title}
                </h2>
            </div>
            {canPost() && posts.status === 'success' && <button className={classnames('btn caps mb-1 mt-2')} onClick={goToReply}>Reply</button>}
            {paginationRender()}
            <div className={`${classes.posts} col relative`}>
                {renderPosts()}
                {
                    canPost() && posts.status === 'success' &&
                        <form className={classnames(classes.editor, 'mx-auto col')} onSubmit={submitPost} ref={reply}>
                            <MdEditor
                                onChange={({ text }) => setEditorContent(text)}
                                renderHTML={text => marked(text)}
                                view={{ menu: true, md: true }}
                                style={{ height: 300, }}
                                value={editorContent}
                                placeholder="Aa"
                            />
                            {editorError && <p className={classnames(classes.editorError, 'mt-1 bold')}>{editorError}</p>}
                            <button className={classnames(classes.submit, 'btn mt-2')}>
                                {submitting ? <Icon className={classnames(classes.submitIcon)} path={mdiLoading} spin={1} /> : 'Send'}
                            </button>
                        </form>
                }
                {paginationRender()}
            </div>
        </>;
    }

    const renderPosts = () => {
        if (posts.status === 'loading') {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        }
        if (posts.status === 'error') {
            setMessage('Something went wrong loading the posts');
            return null;
        }
        if (posts.status === 'success') {
            if (!posts.data?.data.length) {
                return <p className="text-center">No posts were found</p>;
            } else {
                return posts.data.data.map(post => <Post key={post.id} quote={quote} refetch={posts.refetch} post={post} />);
            }
        }
    }
    
    return (
        <>
            <Header />
            <div className={`${classes.container} col py-4`}>
                {render()}
            </div>
        </>
    );
}