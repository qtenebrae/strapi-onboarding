'use client';

import React, { useEffect, useState } from 'react';
import { TodoListsType, TodoListsApi, TodoListDataType } from '@/api/todo-lists.api';
import Card from '@/components/ui/card/Card';
import TodoList from '@/components/todoList/TodoList';
import TodoListForm from '@/components/todoList/TodoListForm';
import styles from './Home.module.css';

const todoListsApi = TodoListsApi.getInstance();

const Home = () => {
    const [todoLists, setTodoLists] = useState<TodoListDataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: TodoListsType = await todoListsApi.getTodoLists();
                setTodoLists(response.data);
            } catch (err) {}
        };

        fetchData();
    }, []);

    const updateAfterDelete = (id: number) => {
        setTodoLists(prevTodoLists => prevTodoLists.filter(todo => todo.id !== id));
    };

    const updateAfterCreate = (newTodoList: TodoListDataType) => {
        setTodoLists(prevTodoLists => [...prevTodoLists, newTodoList]);
    };

    return (
        <div className={styles.wrapper}>
            <Card className={styles.container}>
                <h1>TODO Списки</h1>
                <div className={styles.todoLists}>
                    <TodoListForm updateAfterCreate={updateAfterCreate} />
                    {todoLists.map(todo => (
                        <TodoList key={todo.id} data={todo} updateAfterDelete={updateAfterDelete} />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Home;
