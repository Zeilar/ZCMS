import { FeedbackModalContext } from '../../contexts/FeedbackModalContext';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { mdiLoading, mdiThumbUp } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Http from '../../classes/Http';
import classnames from 'classnames';
import BBCode from '../misc/BBCode';
import Icon from '@mdi/react';


export default function Post({ post, refetch }) {
    const styles = createUseStyles({
        post: {
            boxShadow: [0, 0, 3, 0, 'rgba(0, 0, 0, 0.15)'],
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 3,
            '&:last-child': {
                marginBottom: 0,
            },
        },
        avatar: {
            height: 50,
            width: 50,
        },
        username: {
            color: 'var(--text-primary)',
            alignSelf: 'center',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        head: {
            borderBottom: '1px solid var(--border-primary)',
        },
        footer: {
            borderTop: '1px solid var(--border-primary)',
            gap: '10px',
        },
        metaboxes: {
            alignItems: 'center',
        },
        metabox: {
            borderLeft: '1px solid var(--border-primary)',
            textTransform: 'capitalize',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: [20, 30],
            display: 'flex',
            height: '100%',
        },
        metaboxHeader: {
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            marginBottom: 5,
        },
        metaboxValue: {
            fontWeight: 'bold',
        },
        likeIcon: {
            marginRight: 3,
            width: 15,
        },
        likesAmount: {
            marginRight: 3,
        },
    });
    const classes = styles();

    const [likes, setLikes] = useState(post.postlikes.length);
    const { setMessage } = useContext(FeedbackModalContext);
    const [hasLiked, setHasLiked] = useState(false);
    const [editing, setEditing] = useState(false);
    const [liking, setLiking] = useState(false);
    const { user } = useContext(UserContext);
    const postElement = useRef();

    function canEditOrRemove() {
        if (!user) return false;
        if (user.suspended) return false;
        if (user.roles[0].clearance <= 3) return true;
        if (user.id === post.user.id) return true;        
    }

    function parseDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    }

    async function toggleLike() {
        const formData = new FormData();
        formData.append('hasLiked', hasLiked);
        setLiking(true);
        const response = await Http.put(`posts/${post.id}/toggleLike`);
        setLiking(false);
        if (response.code === 200) {
            setLikes(p => hasLiked ? p - 1 : p + 1);
            setHasLiked(p => !p);
        } else {
            setMessage('Something went wrong');
        }
    }

    async function deletePost() {
        if (!confirm('Are you sure you want to delete this post?')) return;

        const response = await Http.delete(`posts/${post.id}`);
        switch (response.code) {
            case 200:
                refetch();
                break;

            case 404:
                setMessage('Post not found');
                break;

            case 403:
                setMessage('Insufficient permissions');
                break;

            case 401:
                setMessage('Unauthorized');
                break;

            case 500:
                setMessage('Something went wrong');
                break;

            default:
                setMessage('Unexpected error');
                break;
        }
    }

    function likeButtonRender() {
        if (liking) return <Icon className={classnames(classes.likeIcon, 'mr-0')} path={mdiLoading} spin={1} />;
        if (hasLiked) {
            return <>
                <Icon className={classnames(classes.likeIcon)} path={mdiThumbUp} />
                <span className={classnames(classes.likesAmount)}>({likes})</span>
                <span>You liked this</span>
            </>;
        }
        return <>
            <span className={classnames(classes.likesAmount)}>({likes})</span>
            <span>Like this</span>
        </>;
    }
    
    useEffect(() => {
        for (let i = 0; i < post.postlikes.length; i++) {
            if (post.postlikes[i].user_id === user.id) {
                setHasLiked(true);
                break;
            }
        }
    }, []);

    useEffect(() => {
        if (Number(window.location.hash.replace('#', '')) === post.id) {
            window.scrollTo(0, window.scrollY + postElement.current.getBoundingClientRect().top);
        }
    }, [window.location.hash]);

    return (
        <article className={classnames(classes.post, 'col mb-2')} ref={postElement}>
            <div className={classnames(classes.head, 'row')}>
                <img className={classnames(classes.avatar, 'd-flex mx-2 my-auto')} src={`/storage/avatars/${post.user.avatar}`} alt="Profile picture" />
                <NavLink className={classnames(classes.username)} to={`/user/${post.user.username}`}>
                    <h3>{post.user.username}</h3>
                </NavLink>
                <div className={classnames(classes.metaboxes, 'ml-auto d-flex')}>
                    <div className={classnames(classes.metabox)}>
                        <h4 className={classnames(classes.metaboxHeader)}>Registered</h4>
                        <span className={classnames(classes.metaboxValue)}>{parseDate(post.user.created_at)}</span>
                    </div>
                    <div className={classnames(classes.metabox)}>
                        <h4 className={classnames(classes.metaboxHeader)}>Posts</h4>
                        <span className={classnames(classes.metaboxValue)}>{post.user.postsAmount}</span>
                    </div>
                    <div className={classnames(classes.metabox)}>
                        <h4 className={classnames(classes.metaboxHeader)}>Reputation</h4>
                        <span className={classnames(classes.metaboxValue)}>{post.user.likesAmount}</span>
                    </div>
                    <div className={classnames(classes.metabox)}>
                        <h4 className={classnames(classes.metaboxValue)}>{post.user.roles[0].name}</h4>
                    </div>
                </div>
            </div>
            <p className={classnames(classes.body, 'p-2')}>
                <BBCode>
                    {post.content}
                </BBCode>
            </p>
            {
                user &&
                    <div className={classnames(classes.footer, 'row p-2')}>
                        {canEditOrRemove() && <button className={classnames('btn dark caps')}>Edit</button>}
                        {
                            <button className={classnames('btn', { dark: !hasLiked })} onClick={toggleLike} disabled={liking}>
                                <span className={classnames('center-children')}>{likeButtonRender()}</span>
                            </button>
                        }
                        {canEditOrRemove() && <button className={classnames('btn ml-auto danger caps')} onClick={deletePost}>Delete</button>}
                    </div>
            }
        </article>
    );
}
