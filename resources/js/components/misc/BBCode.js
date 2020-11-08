import BBCodeParser from '@bbob/react/es/Component';
import reactPreset from "@bbob/preset-react";
import React from 'react';

export default function BBCode({ children }) {
    return (
        <BBCodeParser plugins={[reactPreset()]}>
            {children}
        </BBCodeParser>
    );
}
