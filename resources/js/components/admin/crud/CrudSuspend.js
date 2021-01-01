import { formatDate } from '../../../functions/helpers';
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import classnames from 'classnames';

export default function CrudSuspend({ field = {}, updateField, ...props }) {
    const styles = createUseStyles({
        label: {
            fontFamily: 'Montserrat',
            fontSize: '0.8rem',
        },
        switch: {
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--color-body)',
            borderRadius: 16,
            height: 15,
            width: 50,
        },
        ball: {
            backgroundColor: 'var(--color-primary)',
            transition: 'all 0.2s ease-in-out',
            border: 'inherit',
            height: 25,
            width: 25,
            left: 0,
            '&.checked': {
                backgroundColor: 'var(--color-main)',
                left: '100%',
            },
        },
    });
    const classes = styles();

    const [checked, setChecked] = useState(Boolean(field.value));

    function toggleHandler() {
        setChecked(p => !p);
        if (checked) {
            updateField(p => p.map(element => element.title === field.title ? { ...element, value: false } : element));
        }
    }
    
    function onChangeHandler(e) {
        updateField(p => p.map(element => element.title === field.title ? { ...element, value: e.target.value } : element));
    }

    return (
        <div className={classnames('col')}>
            <label className={classnames(classes.label, 'mb-2 caps bold')}>{field.title}</label>
            <div className={classnames(classes.switch, 'relative pointer')} onClick={toggleHandler} {...props}>
                <span className={classnames(classes.ball, 'center-self round', { checked: checked })} />
            </div>
            {
                checked &&
                    <input
                        value={field.value ? formatDate(field.value) : ''}
                        className={classnames('input mt-2')}
                        onChange={onChangeHandler}
                        type="date"
                    />
            }
        </div>
    );
}
