import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

export default function Posts({ active }) {
    if (!active) return null;

    return (
        <div className={classnames({ active: active })}>
            
        </div>
    );
}