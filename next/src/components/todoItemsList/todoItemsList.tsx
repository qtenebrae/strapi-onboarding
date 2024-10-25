'use client';

import React, { useEffect, useState } from 'react';
import { TodoItemDataType } from '@/api/todo-items.api';
import { TodoListDataType, TodoListsApi } from '@/api/todo-lists.api';
import Card from '@/components/ui/card/Card';
import TodoItem from '@/components/todoItem/TodoItem';
import styles from './todoItemsList.module.css';
import TodoItemForm from '@/components/todoItem/TodoItemForm';

interface TodoItemsListProps {
    id: number;
}

const todoListsApi = TodoListsApi.getInstance();

const TodoItemsList = ({ id }: TodoItemsListProps) => {
    const [todoList, setTodoList] = useState<TodoListDataType>();
    const [todoItems, setTodoItems] = useState<TodoItemDataType[]>([]);

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

    return (
        <div className={styles.wrapper}>
            <Card className={styles.container}>
                <div>
                    <h2>TODO - {todoList?.attributes.title}</h2>
                </div>
                <div className={styles.todoItems}>
                    <TodoItemForm
                        updateAfterCreate={updateAfterCreate}
                        parentListId={todoList?.id || 0}
                    />
                    {todoItems.map(todo => (
                        <TodoItem key={todo.id} data={todo} updateAfterDelete={updateAfterDelete} />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default TodoItemsList;
