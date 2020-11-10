import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import SimpleMDE from 'simplemde';

export default function Editor(props) {
    const [simplemde, setSimplemde] = useState();
    const wrapper = useRef();

    useEffect(() => {
        setSimplemde(new SimpleMDE({ element: wrapper.current }));
    }, [wrapper.current]);

    return <textarea ref={wrapper} {...props}></textarea>;
}