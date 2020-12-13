import Tags from '@yaireo/tagify/dist/react.tagify';
import { createUseStyles } from 'react-jss';
import '@yaireo/tagify/dist/tagify.css';
import classnames from 'classnames';
import React from 'react';

export default function CrudField({ field = {}, updateField }) {
    const styles = createUseStyles({
        label: {
            fontFamily: 'Montserrat',
            fontSize: '0.8rem',
        },
    });
    const classes = styles();

    function updateTags(e) {
        const parsedTags = JSON.parse(e.target.value).map(object => object.value).join(',');
        updateField(p => {
            const old = p;
            return old.map(element => {
                if (element.title === field.title) {
                    element.value = parsedTags;
                }
                return element;
            });
        });
    }

    return (
        <div className={classnames('col')}>
            <label className={classnames(classes.label, 'mb-2 caps bold')}>{field.title}</label>
            <Tags value={field.value} onChange={updateTags} />
        </div>
    );
}
