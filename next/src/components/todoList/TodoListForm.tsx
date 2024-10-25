import React, { useState } from 'react';
import { TodoListDataType, TodoListsApi, TodoListType } from '@/api/todo-lists.api';
import Card from '@/components/ui/card/Card';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import styles from './TodoList.module.css';

interface TodoListFormProps {
    updateAfterCreate: (newTodoList: TodoListDataType) => void;
}

const todoListsApi = TodoListsApi.getInstance();

const TodoListForm = ({ updateAfterCreate }: TodoListFormProps) => {
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
            const response: TodoListType = await todoListsApi.addTodoList({ title, description });
            updateAfterCreate(response.data);

            setTitle('');
            setDescription('');
            setError('');
        } catch (err) {}
    };

    return (
        <Card className={styles.todoList}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input label='Название' value={title} onChange={e => setTitle(e.target.value)} />
                <Input
                    label='Описание'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                {error && <div className={styles.error}>{error}</div>}

                <Button type='submit' variant='green' className={styles.activeButton}>
                    Добавить список
                </Button>
            </form>
        </Card>
    );
};

export default TodoListForm;
