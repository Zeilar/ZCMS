import React, { useState, useRef, useEffect, useCallback } from 'react';
import PopupModal from './Modals/PopupModal';
import { createUseStyles } from 'react-jss';
import Navbar from './Navbar';

export default function Landing(props) {
    const [showError, setShowError] = useState(true);
    const state = props.location.state;

    return (
        <>
            {state && showError && <PopupModal setActive={setShowError} message={state.message} type={state.type} />}
            <Navbar />
            <section>
                Landing page
            </section>
        </>
    );
}