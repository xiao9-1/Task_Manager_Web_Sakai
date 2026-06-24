import {Roles} from '../enums/roles.enums';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Roles;
}
