import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AdminTask} from '../models/adminTask.model';
import {Roles} from '../../../enums/roles.enums';
import {UserTask} from '../../userTasks/models/userTask.model';

@Injectable({
  providedIn: 'root'
})
export class AdminTasksService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAdminTasks() {
    return this.http.get<AdminTask[]>(
      `${this.baseUrl}/admin/tasks`,
      { withCredentials: true }
    );
  }
}
