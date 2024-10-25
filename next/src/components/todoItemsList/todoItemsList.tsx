'use client';

import React, { useEffect, useState } from 'react';
import { TodoItemDataType } from '@/api/todo-items.api';
import { TodoListDataType, TodoListsApi } from '@/api/todo-lists.api';
import Card from '@/components/ui/card/Card';
import TodoItem from '@/components/todoItem/TodoItem';
import TodoItemForm from '@/components/todoItem/TodoItemForm';
import Button from '@/components/ui/button/Button';
import styles from './todoItemsList.module.css';

interface TodoItemsListProps {
    id: number;
}

const todoListsApi = TodoListsApi.getInstance();

const TodoItemsList = ({ id }: TodoItemsListProps) => {
    const [todoList, setTodoList] = useState<TodoListDataType>();
    const [todoItems, setTodoItems] = useState<TodoItemDataType[]>([]);
    const [sortCompleted, setSortCompleted] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await todoListsApi.getTodoListById(id);
            setTodoItems(response.data.attributes.todo_item?.data || []);
            setTodoList(response.data);
        };

        fetchData();
    }, [id]);

    const updateAfterDelete = (id: number) => {
        setTodoItems(prevTodoLists => prevTodoLists.filter(todo => todo.id !== id));
    };

    const updateAfterCreate = (newTodoList: TodoListDataType) => {
        setTodoItems(prevTodoLists => [...prevTodoLists, newTodoList]);
    };

    const sortedTodoItems = [...todoItems].sort((a, b) => {
        if (sortCompleted === null) return 0;
        return sortCompleted
            ? (a.attributes.completed ? 1 : -1) - (b.attributes.completed ? 1 : -1)
            : (a.attributes.completed ? -1 : 1) - (b.attributes.completed ? -1 : 1);
    });

    const toggleSortCompleted = () => {
        setSortCompleted(prev => (prev === null ? true : !prev));
    };

    return (
        <div className={styles.wrapper}>
            <Card className={styles.container}>
                <div className={styles.tools}>
                    <h2>TODO - {todoList?.attributes.title}</h2>
                    <Button onClick={toggleSortCompleted}>
                        {sortCompleted === null
                            ? 'Сортировать по запланированным'
                            : sortCompleted
                              ? 'Cначала готовые'
                              : 'Сначала запланированные'}
                    </Button>
                </div>
                <div className={styles.todoItems}>
                    <TodoItemForm
                        updateAfterCreate={updateAfterCreate}
                        parentListId={todoList?.id || 0}
                    />
                    {sortedTodoItems.map(todo => (
                        <TodoItem key={todo.id} data={todo} updateAfterDelete={updateAfterDelete} />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default TodoItemsList;
