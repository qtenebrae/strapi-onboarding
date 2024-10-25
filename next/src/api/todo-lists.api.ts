import { AxiosInstance } from 'axios';
import { HttpInstanceFactory } from '@/utils/HttpInstanceFactory';
import { APIResponse, APIResponseCollection, APIResponseData, GetValues } from '@/types/types';
import { Common } from '@strapi/strapi';

const schemaId: Common.UID.ContentType = 'api::todo-list.todo-list';
export type TodoListType = APIResponse<typeof schemaId>;
export type TodoListDataType = APIResponseData<typeof schemaId>;
export type TodoListsType = APIResponseCollection<typeof schemaId>;
export type TodoListAttributes = GetValues<typeof schemaId>;

export class TodoListsApi {
    private static instance: TodoListsApi | null = null;
    private httpInstance: AxiosInstance;

    private constructor() {
        this.httpInstance = HttpInstanceFactory.getBaseInstance();
    }

    public static getInstance(): TodoListsApi {
        if (this.instance) return this.instance;
        this.instance = new TodoListsApi();
        return this.instance;
    }

    async getTodoLists(): Promise<TodoListsType> {
        return (await this.httpInstance.get<TodoListsType>('/todo-lists')).data;
    }

    async getTodoListById(id: number): Promise<TodoListType> {
        return (await this.httpInstance.get<TodoListType>(`/todo-lists/${id}?populate=todo_item`))
            .data;
    }

    async addTodoList(
        data: Pick<TodoListAttributes, 'title' | 'description'>,
    ): Promise<TodoListType> {
        return (await this.httpInstance.post<TodoListType>('/todo-lists', { data: data })).data;
    }

    async deleteTodoList(id: number): Promise<TodoListType> {
        return (await this.httpInstance.delete<TodoListType>(`/todo-lists/${id}`)).data;
    }
}
