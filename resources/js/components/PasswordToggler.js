import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';

export default function PasswordToggler() {
    const [type, setType] = useState('password');
    const icon = useRef();

    function togglePassword() {
        const htmlId = icon.current.parentNode.getAttribute('data-id');
        const newType = type === 'password' ? 'text' : 'password';
        document.getElementById(htmlId).setAttribute('type', newType);
        setType(newType);
    }

    return <FontAwesomeIcon forwardedRef={icon} icon={type === 'password' ? faEyeSlash : faEye} onClick={togglePassword} />;
}