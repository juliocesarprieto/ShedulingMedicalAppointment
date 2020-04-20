import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserService {
    apiUrl = 'http://localhost:8080/register';

    constructor(private http: HttpClient) {}

    register(user: User) {
        return this.http.post(`${this.apiUrl}`, user);
    }
}
