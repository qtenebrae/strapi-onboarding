'use client';

import React from 'react';
import { TodoListDataType, TodoListsApi, TodoListType } from '@/api/todo-lists.api';
import { TrashcanIcon } from '@/components/icons/trashcan-icon';
import Card from '@/components/ui/card/Card';
import Button from '@/components/ui/button/Button';
import Link from 'next/link';
import styles from './TodoList.module.css';
import cn from 'classnames';

interface TodoListProps {
    data: TodoListDataType;
    updateAfterDelete: (id: number) => void;
}

const todoListsApi = TodoListsApi.getInstance();

const TodoList = ({ data, updateAfterDelete }: TodoListProps) => {
    const handleDelete = async () => {
        try {
            const response: TodoListType = await todoListsApi.deleteTodoList(data.id);
            updateAfterDelete(response.data.id);
        } catch (err) {}
    };

    return (
        <Card className={cn(styles.todoList)}>
            <div className={styles.title}>{data.attributes.title}</div>
            <div className={styles.description}>{data.attributes.description}</div>

            <Link href={`/todos/${data.id}`} className={styles.link}>
                Перейти
            </Link>
            <Button className={styles.deleteButton} variant='red' onClick={handleDelete}>
                <TrashcanIcon />
            </Button>
        </Card>
    );
};

export default TodoList;
