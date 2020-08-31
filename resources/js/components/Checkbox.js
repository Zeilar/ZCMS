import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyle, createUseStyles } from 'react-jss';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef, useEffect } from 'react';

export default function Checkbox() {
    const styles = createUseStyles({
        box: {
            border: '1px solid var(--border-primary)',
            'justify-content': 'center',
            'align-items': 'center',
            'border-radius': '4px',
            display: 'flex',
            height: '25px',
            width: '25px',
            '&.checked': {
                'background-color': 'var(--color-secondary)',
                'border-color': 'var(--color-secondary)',
            },
        },
        check: {
            color: 'black',
            display: 'none',
            '&.show': {
                display: 'inline-block',
            },
        },
    });
    const classes = styles();

    const [checked, setChecked] = useState(false);
    const [htmlId, setHtmlId] = useState();
    const [name, setName] = useState();
    const checkbox = useRef();
    const wrapper = useRef();

    useEffect(() => {
        const parent = wrapper.current.parentNode;
        setChecked(checkbox.current.checked);
        setHtmlId(parent.getAttribute('data-id'));
        setName(parent.getAttribute('data-name'));
        console.log(checkbox.current.checked);
    });

    return (
        <div ref={wrapper}>
            <input ref={checkbox} onChange={() => setChecked(p => !p)} hidden type="checkbox" name={name} id={htmlId} />
            <div className={`${classes.box}${checked ? ' checked' : ''}`}>
                <FontAwesomeIcon className={`${classes.check}${checked ? ' show' : ''}`} icon={faCheck} />
            </div>
        </div>
    );
}