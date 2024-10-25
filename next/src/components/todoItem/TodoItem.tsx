'use client';

import React, { useState } from 'react';
import { TodoItemDataType, TodoItemsApi, TodoItemType } from '@/api/todo-items.api';
import { TrashcanIcon } from '@/components/icons/trashcan-icon';
import Card from '@/components/ui/card/Card';
import Button from '@/components/ui/button/Button';
import Toggle from '@/components/ui/toggle/Toggle';
import styles from './TodoItem.module.css';
import cn from 'classnames';

interface TodoItemProps {
    data: TodoItemDataType;
    updateAfterDelete: (id: number) => void;
}

const todoItemsApi = TodoItemsApi.getInstance();

const TodoItem = ({ data, updateAfterDelete }: TodoItemProps) => {
    const [isCompleted, setIsCompleted] = useState(data.attributes.completed || false);

    const handleDelete = async () => {
        try {
            const response: TodoItemType = await todoItemsApi.deleteTodoItem(data.id);
            updateAfterDelete(response.data.id);
        } catch (err) {}
    };

    const handleToggle = async () => {
        try {
            await todoItemsApi.updateTodoItem({
                id: data.id,
                data: { completed: !isCompleted },
            });
            setIsCompleted(!isCompleted);
        } catch (err) {}
    };

    return (
        <Card className={cn(styles.todoItem, { [styles.completed]: isCompleted })}>
            <div className={styles.title}>{data.attributes.title}</div>
            <div className={styles.description}>{data.attributes.description}</div>
            <div>{isCompleted ? 'Готово' : 'Запланировано'}</div>

            <Toggle className={styles.toggle} active={isCompleted} onToggle={handleToggle}></Toggle>
            <Button className={styles.deleteButton} variant='red' onClick={handleDelete}>
                <TrashcanIcon />
            </Button>
        </Card>
    );
};

export default TodoItem;
