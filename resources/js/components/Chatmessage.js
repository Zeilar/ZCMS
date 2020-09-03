import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

export default function Chatmessage({ message }) {
    return (
        <div>
            {message.content}
        </div>
    );
}