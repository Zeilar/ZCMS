import React, { useState, useRef, useEffect } from 'react';
import { BigNavButton } from '../styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

export default function Start() {
    return (
        <div>
            <BigNavButton>Item</BigNavButton>
            <BigNavButton>Item</BigNavButton>
            <BigNavButton>Item</BigNavButton>
        </div>
    );
}
