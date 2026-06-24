import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: () => {
        console.log('Пользователь уже авторизован! Возрат к /tasks');
        this.router.navigate(['/tasks']);
      },
      error: () => {
        console.log('Пользователь не авторизован!');
        // остаёмся на login
      }
    });
  }

  login() {
    console.log('Попытка авторизации пользователя с email:', this.email)
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Успешный вход в систему:', this.email);
        this.loadUser();
      },
      error: () => {
        console.log('Ошибка авторизации');
        this.errorMessage = 'Ошибка авторизации';
      }
    });
  }

  private loadUser() {
    console.log('loadUser() - загрузка пользователя')
    this.authService.getMe().subscribe(user => {
      this.authService.setUser(user);
      this.router.navigate(['/tasks']);
    }
  );}
}
