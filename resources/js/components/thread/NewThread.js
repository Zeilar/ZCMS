import { errorCodeHandler } from '../../functions/helpers';
import { useHistory, useParams } from 'react-router';
import MdEditor from 'react-markdown-editor-lite';
import { createUseStyles } from 'react-jss';
import HttpError from '../http/HttpError';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Http from '../../classes/Http';
import { mdiLoading } from '@mdi/js';
import classnames from 'classnames';
import Header from '../Header';
import Icon from '@mdi/react';
import marked from 'marked';

export default function NewThread() {
    const styles = createUseStyles({
        wrapper: {
            margin: ['auto', 'var(--container-margin)'],
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
        loading: {
            color: 'var(--color-main)',
        },
    });
    const classes = styles();

    const [submitting, setSubmitting] = useState(false);
    const [httpError, setHttpError] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const { category } = useParams();
    const history = useHistory();

    const { data, status } = useQuery(`category-${category}`, async () => {
        const response = await Http.get(`categories/${category}`);
        if (response.code !== 200) return setHttpError(response.code);
        return response.data;
    });
    
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', category);
        formData.append('content', content);
        formData.append('title', title);
        setSubmitting(true);
        const response = await Http.post('threads', { body: formData });
        setSubmitting(false);
        errorCodeHandler(response.code, () => console.log(''/* INPUT HANDLING */), () => history.push(`/thread/${response.data.id}/${response.data.slug}`));
    }

    if (httpError) return <HttpError code={httpError} />

    const render = () => {
        if (status === 'loading') return <Icon className={classnames(classes.loading, 'loadingWheel-2 center-self')} path={mdiLoading} spin={1} />
        return (
            <>
                <h2 className={classnames(classes.header, 'px-4 py-2 w-fit mb-3')}>Create new thread in {data?.name ?? category}</h2>
                <form className={classnames(classes.form, 'p-4')} onSubmit={submit}>
                    <div className={classnames(classes.titleGroup, 'relative mb-3')}>
                        <input
                            className={classnames(classes.title, { active: title !== '' }, 'relative')} 
                            value={title} onChange={e => setTitle(e.target.value)}
                        />
                        <label className={classnames(classes.label, 'absolute no-select no-pointer')}>Title</label>
                        <div className={classnames(classes.border, 'absolute')}></div>
                    </div>
                    <MdEditor
                        onChange={({ text }) => setContent(text)}
                        renderHTML={text => marked(text)}
                        view={{ menu: true, md: true }}
                        style={{ height: 400 }}
                        placeholder="Aa"
                        value={content}
                    />
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