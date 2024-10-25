import axios, { AxiosInstance } from 'axios';
import 'dotenv/config';
import * as process from 'process';

const backend_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export class HttpInstanceFactory {
    private static baseInstance: AxiosInstance | null = null;

    public static getBaseInstance(): AxiosInstance {
        if (this.baseInstance) return this.baseInstance;
        this.baseInstance = axios.create({
            baseURL: backend_url,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return this.baseInstance;
    }
}
