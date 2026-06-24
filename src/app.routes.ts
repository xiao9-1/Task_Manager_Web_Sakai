import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { TasksComponent } from '@/app/pages/tasks/components/tasks.component';
import { Login } from '@/app/pages/auth/login';

export const appRoutes: Routes = [
    { path: 'auth/login', component: Login },

    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: 'tasks', pathMatch: 'full' },
            { path: 'tasks', component: TasksComponent }
        ]
    },

    { path: '**', redirectTo: 'tasks' }
];
