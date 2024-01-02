import { IModules } from './modules.entity';
import { IUser } from './user.entity';

export interface IAccess {
  id: number;
  user: IUser;
  modulo: IModules;
  dtcadastro: Date;
}
