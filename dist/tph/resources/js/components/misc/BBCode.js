import BBCodeParser from '@bbob/react/es/Component';
import reactPreset from "@bbob/preset-react";
import React from 'react';

// const quote = reactPreset.extend((tags, options) => ({
//     ...tags,
//     quote: node => ({
//         tag: "blockquote",
//         content: `Written by ${node.attrs.name}${node.content.join('')}`,
//     }),
// }));

export default function BBCode({ children }) {
    return (
        <BBCodeParser plugins={[reactPreset()]}>
            {children}
        </BBCodeParser>
    );
}
