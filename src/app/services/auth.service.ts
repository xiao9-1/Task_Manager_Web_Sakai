import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getMe().subscribe({
      next: user => this.setUser(user)
    });
  }

  login(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  getMe() {
    return this.http.get<User>(
      `${this.baseUrl}/me`,
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post(
      'http://localhost:8080/logout',
      {},
      { withCredentials: true }
    );
  }

  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.user$;
  }

}
