import React from 'react';
import styles from './Card.module.css';
import cn from 'classnames';

interface CardProps extends React.HTMLProps<HTMLDivElement> {}

const Card = ({ children, className }: CardProps) => {
    return <div className={cn(styles.card, className)}>{children}</div>;
};

export default Card;
