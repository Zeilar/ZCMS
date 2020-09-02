import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function Chat() {
    const styles = createUseStyles({
        chat: {
            
        },
    });
    const classes = styles();

    return (
        <div className={classes.chat}>
            Chat
        </div>
    );
}