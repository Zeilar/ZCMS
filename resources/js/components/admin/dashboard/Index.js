import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import Sidebar from './Sidebar';
import './dashboard.scss';

export default function Index() {
    return (
        <>
            <Sidebar />
            Index
        </>
    );
}