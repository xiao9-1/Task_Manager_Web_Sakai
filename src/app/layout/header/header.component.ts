import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Roles} from '../../enums/roles.enums';
import {CommonModule} from '@angular/common';
import {ModeService} from '../../services/mode.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly Roles = Roles;

  constructor(
    private modeService: ModeService,
    private authService: AuthService,
    private router: Router
  ) {}

  setMode(mode: Roles) {
    this.modeService.setMode(mode);

    this.router.navigate([], {
      queryParams: {
        mode: mode === Roles.ADMIN ? 'admin' : 'user'
      }
    });
  }

  get mode$() {
    return this.modeService.mode$;
  }

  onLogout() {
    console.log('Выход из системы');
    this.authService.setUser(null);
    this.modeService.setMode(Roles.USER);

    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  get user$() {
    return this.authService.user$;
  }
}

