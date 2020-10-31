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
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.05s linear',
                pointerEvents: 'none',
                position: 'absolute',
                left: '50%',
                opacity: 0,
                '@media (max-width: 1200px)': {
                    display: 'none',
                },
            },
            '&::before': {
                borderTop: '10px solid var(--color-darkGray)',
                borderRight: '10px solid transparent',
                borderLeft: '10px solid transparent',
                content: '""',
                opacity: 0,
                height: 0,
                width: 0,
                top: -15,
            },
            '&::after': {
                backgroundColor: 'var(--color-darkGray)',
                color: 'var(--color-primary)',
                content: `"${title}"`,
                whiteSpace: 'nowrap',
                padding: [8, 12],
                borderRadius: 3,
                top: -35,
            },
        },
    });
    const classes = styles();

    return React.createElement(tagName ?? 'div', { ...props, className: `${props.className} ${classes.element}`}, children);
}
