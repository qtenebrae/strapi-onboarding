import { TodoListDataType, TodoListsApi, TodoListsType } from '@/api/todo-lists.api';
import Home from '@/components/home/Home';

const todoListsApi = TodoListsApi.getInstance();

const fetchData = async (): Promise<TodoListDataType[] | undefined> => {
    try {
        const response: TodoListsType = await todoListsApi.getTodoLists();
        return response.data;
    } catch (err) {}
};

export default async function HomePage() {
    const todoLists: TodoListDataType[] = (await fetchData()) || [];

    return <Home initialTodoLists={todoLists} />;
}
