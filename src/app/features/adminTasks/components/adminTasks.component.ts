import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminTasksService} from '../services/adminTasks.service';
import {Roles} from '../../../enums/roles.enums'
import {UserTask} from '../../userTasks/models/userTask.model';
import {ModeService} from '../../../services/mode.service';
import {AdminTask} from '../models/adminTask.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: 'adminTasks.component.html',
  styleUrl: 'adminTasks.component.css'
})
export class AdminTasksComponent {

  user: any;
  mode: Roles = Roles.USER;
  Roles = Roles;

  adminTasks: AdminTask[] = [];
  userTasks: UserTask[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: AdminTasksService,
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
    console.log('Загрузка задач администратора');
    this.tasksService.getAdminTasks().subscribe(data => {
      this.userTasks = [];
      this.adminTasks = data;
      this.cdr.markForCheck();})

  }
}
