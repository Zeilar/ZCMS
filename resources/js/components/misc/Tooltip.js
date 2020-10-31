import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Tooltip({ tagName, title, children, ...props }) {
    const styles = createUseStyles({
        element: {
            position: 'relative',
            '&:hover': {
                '&::after, &::before': {
                    opacity: 1,
                },
            },
            '&::before, &::after': {
                transition: 'all 0.05s linear',
                pointerEvents: 'none',
                '@media (max-width: 1200px)': {
                    display: 'none',
                },
            },
            '&::before': {
                opacity: 0,
            },
            '&::after': {
                backgroundColor: 'var(--color-darkGray)',
                transform: 'translate(-50%, -50%)',
                color: 'var(--color-primary)',
                content: `"${title}"`,
                whiteSpace: 'nowrap',
                position: 'absolute',
                padding: [8, 12],
                borderRadius: 3,
                left: '50%',
                opacity: 0,
                top: -30,
            },
        },
    });
    const classes = styles();

    return React.createElement(tagName ?? 'div', { ...props, className: `${props.className} ${classes.element}`}, children);
}
