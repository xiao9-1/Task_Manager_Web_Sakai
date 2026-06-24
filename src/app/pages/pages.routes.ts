import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { TasksComponent } from '@/app/pages/tasks/components/tasks.component';
import { Login } from '@/app/pages/auth/login';

export default [
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' },
    { path: 'auth/login', component: Login },
    { path: 'tasks', component: TasksComponent }
] as Routes;
