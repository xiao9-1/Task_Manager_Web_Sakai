import {Roles} from '../../../enums/roles.enums'
import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../../../layout/header/header.component';
import {AdminTasksComponent} from '../../../features/adminTasks/components/adminTasks.component';
import {UserTasksComponent} from '../../../features/userTasks/components/userTasks.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AdminTasksComponent, UserTasksComponent],
  templateUrl: './tasks.component.html',
  styleUrl: 'tasks.component.css'
})
export class TasksComponent {

  mode: Roles = Roles.USER;
  Roles = Roles;

  constructor(private cdr: ChangeDetectorRef,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];

      this.mode = mode === 'admin'
        ? Roles.ADMIN
        : Roles.USER;

      console.log('Режим:', this.mode)
    });
  }

}
