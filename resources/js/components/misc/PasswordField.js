import { mdiEye, mdiEyeOff } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import Icon from '@mdi/react';

export default function PasswordField({ children, className, containerClass, iconProps, ...props }) {
    const styles = createUseStyles({
        row: {

        },
        input: {
            paddingRight: 40,  
        },
        icon: {
            transform: 'translateY(-50%)',
            backgroundColor: 'inherit',
            color: 'var(--color-main)',
            top: '50%',
            width: 25,
            right: 8,
        },
    });
    const classes = styles();

    const [visible, setVisible] = useState(false);

    return (
        <div className={`${classes.row} ${containerClass ?? ''} relative row`}>
            <input {...props} className={`${classes.input} ${className ?? ''}`} type={visible ? 'text' : 'password'} />
            <Icon
                className={`${classes.icon} absolute pointer ${iconProps?.className ?? ''}`}
                path={visible ? mdiEye : mdiEyeOff}
                onClick={() => setVisible(p => !p)}
                {...iconProps} 
            />
        </div>
    );
}