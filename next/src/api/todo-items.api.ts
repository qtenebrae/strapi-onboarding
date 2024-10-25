import { AxiosInstance } from 'axios';
import { HttpInstanceFactory } from '@/utils/HttpInstanceFactory';
import { APIResponse, APIResponseCollection, APIResponseData, GetValues } from '@/types/types';
import { Common } from '@strapi/strapi';

const schemaId: Common.UID.ContentType = 'api::todo-item.todo-item';
export type TodoItemType = APIResponse<typeof schemaId>;
export type TodoItemDataType = APIResponseData<typeof schemaId>;
export type TodoItemsType = APIResponseCollection<typeof schemaId>;
export type TodoItemAttributes = GetValues<typeof schemaId>;

export class TodoItemsApi {
    private static instance: TodoItemsApi | null = null;
    private httpInstance: AxiosInstance;

    private constructor() {
        this.httpInstance = HttpInstanceFactory.getBaseInstance();
    }

    public static getInstance(): TodoItemsApi {
        if (this.instance) return this.instance;
        this.instance = new TodoItemsApi();
        return this.instance;
    }

    async getTodoItems(): Promise<TodoItemsType> {
        return (await this.httpInstance.get<TodoItemsType>('/todo-items')).data;
    }

    async addTodoItem(data: {
        title: string;
        description: string;
        completed: boolean;
        todo_list: number;
    }): Promise<TodoItemType> {
        return (await this.httpInstance.post<TodoItemType>('/todo-items', { data: data })).data;
    }

    async deleteTodoItem(id: number): Promise<TodoItemType> {
        return (await this.httpInstance.delete<TodoItemType>(`/todo-items/${id}`)).data;
    }
}
