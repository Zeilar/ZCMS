import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

export default function CrudField({ field = {}, updateField }) {
    function onChangeHandler(e) {
        updateField(p => {
            const old = p;
            return old.map(element => {
                if (element.title === field.title) {
                    element.value = e.target.value;
                }
                return element;
            });
        });
    }

    return (
        <div className={classnames('col')}>
            <label>{field.title}</label>
            <input className={classnames('mt-2')} type={field.type ?? 'text'} value={field.value} onChange={onChangeHandler} />
        </div>
    );
}
