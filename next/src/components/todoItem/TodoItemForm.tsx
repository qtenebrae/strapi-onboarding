import React, { useState } from 'react';
import { TodoItemDataType, TodoItemsApi, TodoItemType } from '@/api/todo-items.api';
import Card from '@/components/ui/card/Card';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import styles from './TodoItem.module.css';

interface TodoItemFormProps {
    parentListId: number;
    updateAfterCreate: (newTodoList: TodoItemDataType) => void;
}

const todoItemsApi = TodoItemsApi.getInstance();

const TodoItemForm = ({ updateAfterCreate, parentListId }: TodoItemFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() === '' || description.trim() === '') {
            setError('Введите данные!');
            return;
        }

        try {
            const response: TodoItemType = await todoItemsApi.addTodoItem({
                title,
                description,
                completed: false,
                todo_list: parentListId,
            });
            updateAfterCreate(response.data);

            setTitle('');
            setDescription('');
            setError('');
        } catch (err) {}
    };

    return (
        <Card className={styles.todoItem}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input label='Название' value={title} onChange={e => setTitle(e.target.value)} />
                <Input
                    label='Описание'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                {error && <div className={styles.error}>{error}</div>}

                <Button type='submit' variant='green' className={styles.addButton}>
                    Добавить список
                </Button>
            </form>
        </Card>
    );
};

export default TodoItemForm;
