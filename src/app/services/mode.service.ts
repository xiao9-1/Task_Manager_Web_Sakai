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
    console.log('HEADER setMode:', mode);
    this.modeSubject.next(mode);
  }

  getMode(): Roles {
    return this.modeSubject.value;
  }
}
