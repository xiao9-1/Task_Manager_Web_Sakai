import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Roles } from '../enums/roles.enums';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  private modeSubject = new BehaviorSubject<Roles>(Roles.USER);

  mode$ = this.modeSubject.asObservable();

  setMode(mode: Roles): void {
    this.modeSubject.next(mode);
    console.log('ModeService - установлен mode: ', mode);
  }

  getMode(): Roles {
    console.log('ModeService - получен mode:', this.modeSubject.value);
    return this.modeSubject.value;
  }
}
