import React, { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, ...props }, ref) => {
    return (
        <label className={cn(styles.inputWrapper, className)}>
            <div>{label}</div>
            <input ref={ref} className={cn(styles.input)} {...props} />
        </label>
    );
});

Input.displayName = 'Input';

export default Input;
