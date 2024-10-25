'use client';

import React from 'react';
import { TodoItemDataType, TodoItemsApi, TodoItemType } from '@/api/todo-items.api';
import { TrashcanIcon } from '@/components/icons/trashcan-icon';
import Card from '@/components/ui/card/Card';
import Button from '@/components/ui/button/Button';
import styles from './TodoItem.module.css';
import cn from 'classnames';

interface TodoItemProps {
    data: TodoItemDataType;
    updateAfterDelete: (id: number) => void;
}

const todoItemsApi = TodoItemsApi.getInstance();

const TodoItem = ({ data, updateAfterDelete }: TodoItemProps) => {
    const handleDelete = async () => {
        try {
            const response: TodoItemType = await todoItemsApi.deleteTodoItem(data.id);
            updateAfterDelete(response.data.id);
        } catch (err) {}
    };

    return (
        <Card className={cn(styles.todoItem)}>
            <div className={styles.title}>{data.attributes.title}</div>
            <div className={styles.description}>{data.attributes.description}</div>
            <div>{data.attributes.completed ? 'Готово' : 'Запланировано'}</div>

            <Button className={styles.deleteButton} variant='red' onClick={handleDelete}>
                <TrashcanIcon />
            </Button>
        </Card>
    );
};

export default TodoItem;
