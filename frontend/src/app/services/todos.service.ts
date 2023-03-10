import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TodosService {
    constructor(private http: HttpClient) {}

    addTodo(todoData: TodosDataDto) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            })
        };
        console.log("todoData", todoData);
        return this.http.post(`${environment.TODO}`, todoData, httpOptions).toPromise();
    }

    getTodosByUserId(userId: string | null): Promise<TodosDataDto[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            })
        };
        return this.http
            .get<TodosDataDto[]>(`${environment.TODO}/userId/${userId}`, httpOptions)
            .toPromise();
    }

    getTodoById(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            })
        };
        return this.http.get(`${environment.TODO}/id/${id}`, httpOptions).toPromise();
    }

    deleteTodoById(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            })
        };
        return this.http.delete(`${environment.TODO}/id/${id}`, httpOptions).toPromise();
    }

    editTodoById(id: number, todoData: TodosDataDto) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            })
        };
        return this.http.put(`${environment.TODO}/id/${id}`, todoData, httpOptions).toPromise();
    }
}

export enum TodoStatus {
    NOT_STARTED="Not Started",
    IN_PROGRESS="In Progress",
    DONE="Done"
}

export interface TodoDto {
    description: string;
    status: TodoStatus;
}

export interface TodosDataDto {
    id: number;
    description: string;
    status: TodoStatus;
    user_id: number;
}
