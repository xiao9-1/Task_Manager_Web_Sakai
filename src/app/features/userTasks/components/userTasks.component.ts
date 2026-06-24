import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserTasksService} from '../services/userTasks.service';
import {Roles} from '../../../enums/roles.enums'
import {UserTask} from '../models/userTask.model';
import {AdminTask} from '../../adminTasks/models/adminTask.model';
import {HeaderComponent} from '../../../layout/header/header.component';
import {ModeService} from '../../../services/mode.service';

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
    private tasksService: UserTasksService,
    private cdr: ChangeDetectorRef,
    private modeService: ModeService
  ) {}

  ngOnInit() {

    this.modeService.mode$.subscribe( mode => {
      this.mode = mode;
      this.loadTasks()
    })

    this.loadUser();
  }

  loadUser() {
    this.authService.getMe().subscribe({
      next: user => {
        this.user = user;
        this.cdr.markForCheck();
      },
      error: () => this.router.navigate(['/login'])
    });
  }

  loadTasks() {
    console.log('Загрузка задач пользователя');
    this.tasksService.getUserTasks().subscribe(data => {
      this.adminTasks = [];
      this.userTasks = data;
      this.cdr.markForCheck();})

  }
}
