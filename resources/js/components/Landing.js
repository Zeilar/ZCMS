import React, { useState, useRef, useEffect, useCallback } from 'react';
import ErrorModal from './Modals/ErrorModal';
import { createUseStyles } from 'react-jss';
import Navbar from './Navbar';

export default function Landing(props) {
    const [showError, setShowError] = useState(true);
    
    return (
        <>
            {props.location.state && showError && <ErrorModal setActive={setShowError} message={props.location.state} />}
            <Navbar />
            <section>
                Landing page
            </section>
        </>
    );
}