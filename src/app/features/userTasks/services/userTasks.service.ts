import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserTask} from '../models/userTask.model';

@Injectable({
  providedIn: 'root'
})
export class UserTasksService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUserTasks() {
    return this.http.get<UserTask[]>(
      `${this.baseUrl}/tasks`,
      { withCredentials: true }
    );
  }
}
