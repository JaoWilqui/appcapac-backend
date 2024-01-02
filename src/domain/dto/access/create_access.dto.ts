import { IModules } from 'src/domain/entities/modules.entity';
import { IUser } from 'src/domain/entities/user.entity';

export class ICreateAccess {
  modulo: IModules;
  user: IUser;
}
