import { Component, inject } from '@angular/core';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';
import { Button } from 'primeng/button';
import { AuthService } from '@/app/service/auth.service';
import { Roles } from '@/app/enums/roles.enums';
import { ModeService } from '@/app/service/mode.service';
import { Toolbar } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, Button, CardModule, AppConfigurator],
    template: ` <div class="layout-topbar">
        <div class="flex align-items-center gap-2">
            <a class="layout-topbar-logo" routerLink="/">
                <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                <span>Task Manager</span>
            </a>
        </div>

        <!-- CENTER: mode switch -->
        <div class="flex gap-2 align-items-center mx-auto">
            <p-button label="User" icon="pi pi-user" (click)="setMode(Roles.USER)" [rounded]="true" [outlined]="(mode$ | async) !== Roles.USER"> </p-button>

            <p-button *ngIf="(user$ | async)?.role === 'ADMIN'" label="Admin" icon="pi pi-shield" (click)="setMode(Roles.ADMIN)" [rounded]="true" [outlined]="(mode$ | async) !== Roles.ADMIN"> </p-button>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <!-- RIGHT: user + logout -->
            <div class="flex align-items-center gap-4 ml-auto">
                <ng-container *ngIf="user$ | async as user">
                    <div class="flex align-items-center gap-2 text-lg flex-wrap">
                        <span
                            ><b>{{ user.name }}</b></span
                        >
                        <span>•</span>
                        <span>ID {{ user.id }}</span>
                        <span>•</span>
                        <span>{{ user.email }}</span>
                        <span>•</span>
                        <span class="text-primary font-semibold">
                            {{ user.role }}
                        </span>
                    </div>
                </ng-container>

                <p-button label="Logout" icon="pi pi-sign-out" severity="danger" [outlined]="true" (click)="onLogout()"> </p-button>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    layoutService = inject(LayoutService);

    protected readonly Roles = Roles;

    constructor(
        private modeService: ModeService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {}

    setMode(mode: Roles) {

        console.log('Topbar -  Нажатие кнопки смены Mode');

        console.log('Текущий mode:', this.modeService.getMode());
        if (this.modeService.getMode() === this.modeService.getMode()) {
            return;
        }

        this.modeService.setMode(mode);
        console.log('Topbar - Установлен мод:', mode);

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
        //this.modeService.setMode(Roles.USER);

        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/auth/login']);
            },
            error: () => {
                this.router.navigate(['auth//login']);
            }
        });
    }

    get user$() {
        return this.authService.user$;
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
}
