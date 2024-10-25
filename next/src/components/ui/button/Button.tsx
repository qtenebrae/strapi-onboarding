import React from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'blue' | 'red' | 'green';
}

const Button = ({ children, variant = 'blue', className, ...props }: ButtonProps) => {
    return (
        <button
            className={cn(styles.button, className, {
                [styles.red]: variant === 'red',
                [styles.blue]: variant === 'blue',
                [styles.green]: variant === 'green',
            })}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
