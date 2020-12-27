import { errorCodeHandler } from '../../functions/helpers';
import { useHistory, useParams } from 'react-router';
import { mdiLoading, mdiArrowLeft } from '@mdi/js';
import MdEditor from 'react-markdown-editor-lite';
import { Http, Validator } from '../../classes';
import { createUseStyles } from 'react-jss';
import { Back } from '../styled-components';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { HttpError } from '../http';
import classnames from 'classnames';
import { Header } from '../layout';
import Icon from '@mdi/react';
import marked from 'marked';

export default function NewThread() {
    const styles = createUseStyles({
        wrapper: {
            margin: ['auto', 'var(--container-margin)'],
            '@media (max-width: 768px)': {
                margin: 'var(--container-margin)',
            },
        },
        form: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 3,
        },
        header: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            backgroundImage: 'var(--color-main-gradient)',
            color: 'var(--color-primary)',
            borderRadius: 3,
            padding: 15,
            '&:hover': {
                color: 'var(--color-primary)',
                textDecoration: 'none',
            },
        },
        titleGroup: {

        },
        label: {
            transition: 'all 0.15s linear',
            fontSize: '1.25rem',
            bottom: 5,
            left: 0,
        },
        title: {
            borderBottom: '2px solid var(--border-primary)',
            padding: [5, 0],
            border: 0,
            '&::after': {
                backgroundColor: 'var(--color-main)',
                transition: 'all 0.15s linear',
                transform: 'translateX(-50%)',
                position: 'absolute',
                content: '""',
                left: '50%',
                width: '0',
                bottom: 0,
                height: 2,
            },
            '&:focus, &.active': {
                boxShadow: 'none',
                '&~label': {
                    color: 'var(--color-main)',
                    fontSize: '1rem',
                    bottom: '100%',
                },
                '&~div': {
                    width: '100%',
                },
            },
        },
        border: {
            backgroundColor: 'var(--color-main)',
            transition: 'all 0.15s linear',
            transform: 'translateX(-50%)',
            content: '""',
            left: '50%',
            bottom: 0,
            height: 2,
            width: 0,
        },
        button: {
            fontSize: '1.25rem',
        },
        icon: {
            width: 15,
        },
        categoryIcon: {
            filter: 'brightness(0) invert(1)',
            width: 25,
        },
    });
    const classes = styles();

    const [submitting, setSubmitting] = useState(false);
    const [inputErrors, setInputErrors] = useState({});
    const [httpError, setHttpError] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const { category } = useParams();
    const history = useHistory();

    const { data, status } = useQuery(`category-${category}`, async () => {
        const response = await Http.get(`categories/${category}`);
        if (response.code !== 200) return setHttpError(response.code);
        return response.data;
    }, { retry: false });
    
    async function submit(e) {
        e.preventDefault();
        const validatedTitle = new Validator(title, 'title').required().min(3).max(150);
        const validatedContent = new Validator(content, 'content').required().min(3).max(1000);
        if (validatedTitle.errors.length > 0 || validatedContent.errors.length > 0) {
            return setInputErrors({ title: validatedTitle.errors[0], content: validatedContent.errors[0] });
        }
        const formData = new FormData();
        formData.append('category', category);
        formData.append('content', content);
        formData.append('title', title);
        setSubmitting(true);
        const response = await Http.post('threads', { body: formData });
        setSubmitting(false);
        errorCodeHandler(response.code, message => setMessage(message), () => history.push(`/thread/${response.data.id}/${response.data.slug}`));
    }

    if (httpError) return <HttpError code={httpError} />

    const render = () => {
        if (status === 'loading') return <Icon className={classnames('loadingWheel-2 center-self')} path={mdiLoading} spin={1} />
        return (
            <>
                <div className={classnames('row mb-3')}>
                    <Back as={NavLink} to={`/category/${data?.name}`}>
                        <Icon path={mdiArrowLeft} />
                    </Back>
                    <h2 className={classnames(classes.header, 'ml-2 center-children w-fit')}>
                        <img className={classnames(classes.categoryIcon, 'mr-2')} src={`/storage/category-icons/${data?.icon}.svg`} alt={data?.name} />
                        <span>{data?.name}</span>
                    </h2>
                </div>
                <form className={classnames(classes.form, 'p-4')} onSubmit={submit}>
                    <div className={classnames(classes.titleGroup, 'relative mb-1')}>
                        <input
                            className={classnames(classes.title, { active: title !== '' }, 'relative')} 
                            value={title} onChange={e => setTitle(e.target.value)} type="text"
                        />
                        <label className={classnames(classes.label, 'absolute no-select no-pointer')}>Title</label>
                        <div className={classnames(classes.border, 'absolute')}></div>
                    </div>
                    {inputErrors.title && <p className={classnames('color-danger mt-2')} dangerouslySetInnerHTML={{ __html: inputErrors.title }} />}
                    <MdEditor
                        onChange={({ text }) => setContent(text)}
                        style={{ height: 400, marginTop: 25 }}
                        renderHTML={text => marked(text)}
                        view={{ menu: true, md: true }}
                        placeholder="Aa"
                        value={content}
                    />
                    {inputErrors.content && <p className={classnames('color-danger mt-3')} dangerouslySetInnerHTML={{ __html: inputErrors.content }} />}
                    <button className={classnames(classes.button, 'btn mt-3')} disabled={submitting}>
                        {submitting ? <Icon className={classnames(classes.icon)} path={mdiLoading} spin={1} /> : <span>Create thread</span>}
                    </button>
                </form>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className={classnames(classes.wrapper, 'col')}>
                {render()}
            </div>
        </>
    );
}