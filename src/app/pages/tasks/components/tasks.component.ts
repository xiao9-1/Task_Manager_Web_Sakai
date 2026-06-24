import {Roles} from '@/app/enums/roles.enums'
import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminTasksComponent} from '@/app/features/adminTasks/components/adminTasks.component';
import {UserTasksComponent} from '@/app/features/userTasks/components/userTasks.component';
import {ActivatedRoute} from '@angular/router';
import { ModeService } from '@/app/service/mode.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, AdminTasksComponent, UserTasksComponent],
    templateUrl: './tasks.component.html',
    styleUrl: 'tasks.component.css'
})
export class TasksComponent {
    mode$!: Observable<Roles>;

    protected readonly Roles = Roles;

    constructor(private modeService: ModeService) {
        this.mode$ = this.modeService.mode$;
    }
}
