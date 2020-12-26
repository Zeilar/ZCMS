import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

export default function Title({ children, ...props }) {
    return (
        <h2 {...props}>
            {children}
        </h2>
    );
}