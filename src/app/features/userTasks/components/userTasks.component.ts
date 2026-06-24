import {AuthService} from '@/app/service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserTasksService} from '../services/userTasks.service';
import {Roles} from '@/app/enums/roles.enums'
import {UserTask} from '../models/userTask.model';
import {AdminTask} from '../../adminTasks/models/adminTask.model';
import {ModeService} from '@/app/service/mode.service';
import { AdminTasksService } from '@/app/features/adminTasks/services/adminTasks.service';

@Component({
    selector: 'app-user-tasks',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './userTasks.component.html',
    styleUrl: 'userTasks.component.css'
})
export class UserTasksComponent {
    user: any;
    mode: Roles = Roles.USER;
    Roles = Roles;

    adminTasks: AdminTask[] = [];
    userTasks: UserTask[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private userTasksService: UserTasksService,
        private adminTaskService: AdminTasksService,
        private cdr: ChangeDetectorRef,
        private modeService: ModeService
    ) {}

    ngOnInit() {
        this.loadTasks();
    }

    loadUser() {
        this.authService.getMe().subscribe({
            next: (user) => {
                this.user = user;
                this.cdr.markForCheck();
            },
            error: () => this.router.navigate(['/login'])
        });
    }

    loadTasks() {
        console.log('Загрузка задач пользователя')
        this.userTasksService.getUserTasks().subscribe((data) => {
            this.userTasks = data;
            this.adminTasks = [];
            this.cdr.markForCheck();
        });
    }
}
