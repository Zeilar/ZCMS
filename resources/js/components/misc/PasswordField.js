import { mdiEye, mdiEyeOff } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function PasswordField({ children, className, containerClass, iconProps, ...props }) {
    const styles = createUseStyles({
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
        <div className={classnames(containerClass, 'relative row')}>
            <input {...props} className={classnames(classes.input, className)} type={visible ? 'text' : 'password'} />
            <Icon
                className={classnames(classes.icon, iconProps?.className, 'absolute pointer')}
                path={visible ? mdiEye : mdiEyeOff}
                onClick={() => setVisible(p => !p)}
                {...iconProps} 
            />
        </div>
    );
}