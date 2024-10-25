import React from 'react';
import styles from './Toggle.module.css';
import cn from 'classnames';

type ToggleProps = {
    className: string;
    active: boolean;
    onToggle: () => void;
};

const Toggle = ({ active, onToggle, className }: ToggleProps) => {
    return (
        <div
            onClick={onToggle}
            className={cn(styles.container, className, {
                [styles.active]: active,
            })}
        >
            <div className={cn(styles.circle, { [styles.activeCircle]: active })} />
        </div>
    );
};

export default Toggle;
