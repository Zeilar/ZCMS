import Tags from '@yaireo/tagify/dist/react.tagify';
import { createUseStyles } from 'react-jss';
import '@yaireo/tagify/dist/tagify.css';
import React, { useRef } from 'react';
import classnames from 'classnames';

export default function CrudField({ field = {}, updateField }) {
    const styles = createUseStyles({
        label: {
            fontFamily: 'Montserrat',
            fontSize: '0.8rem',
        },
    });
    const classes = styles();

    const input = useRef();

    function updateTags() {
        updateField(p => {
            return p.map(element => {
                if (element.title === field.title) {
                    return {
                        ...element,
                        value: input.current.value,
                    }
                }
                return element;
            });
        });
    }

    return (
        <div className={classnames('col')}>
            <label className={classnames(classes.label, 'mb-2 caps bold')}>{field.title}</label>
            <Tags tagifyRef={input} value={field.value} onBlur={updateTags} />
        </div>
    );
}
