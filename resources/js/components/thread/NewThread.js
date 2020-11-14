import { errorCodeHandler } from '../../functions/helpers';
import MdEditor from 'react-markdown-editor-lite';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import React, { useState } from 'react';
import Http from '../../classes/Http';
import { mdiLoading } from '@mdi/js';
import classnames from 'classnames';
import Header from '../Header';
import Icon from '@mdi/react';
import marked from 'marked';

export default function NewThread() {
    const styles = createUseStyles({
        form: {
            boxShadow: [0, 0, 5, 0, 'rgba(0, 0, 0, 0.15)'],
            margin: ['auto', 'var(--container-margin)'],
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-primary)',
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
    });
    const classes = styles();

    const [submitting, setSubmitting] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const history = useHistory();
    
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        formData.append('title', title);
        setSubmitting(true);
        const response = await Http.post('threads', { body: formData });
        setSubmitting(false);
        errorCodeHandler(response.code, () => console.log(''), () => history.push(`/thread/${response.data.id}/${response.data.slug}`));
    }

    return (
        <>
            <Header />
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
                    style={{ height: 300, }}
                    value={content}
                />
                <button className={classnames(classes.button, 'btn mt-3')}>
                    {submitting ? <Icon path={mdiLoading} spin={1} /> : 'Create thread'}
                </button>
            </form>
        </>
    );
}