import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

export default function Checkbox() {
    const styles = createUseStyles({
        wrapper: {

        },
        box: {
            border: '1px solid var(--border-primary)',
            'justify-content': 'center',
            'align-items': 'center',
            'border-radius': '4px',
            cursor: 'pointer',
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

    function toggleChecked() {
        setChecked(p => !p);
    }

    useEffect(() => {
        const parent = wrapper.current.parentNode;
        setHtmlId(parent.getAttribute('data-id'));
        setName(parent.getAttribute('data-name'));
        setChecked(checkbox.current.checked);
    }, [setHtmlId, setName, setChecked, wrapper]);

    return (
        <div className={classes.wrapper} ref={wrapper}>
            <input ref={checkbox} checked={checked} onChange={toggleChecked} hidden type="checkbox" name={name} id={htmlId} />
            <div className={`${classes.box}${checked ? ' checked' : ''}`} onClick={toggleChecked}>
                <FontAwesomeIcon className={`${classes.check}${checked ? ' show' : ''}`} icon={faCheck} />
            </div>
        </div>
    );
}