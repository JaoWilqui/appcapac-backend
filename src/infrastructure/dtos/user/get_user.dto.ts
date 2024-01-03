import { IModules } from 'src/domain/entities/modules.entity';
import { IUser } from 'src/domain/entities/user.entity';

export class GetUserDto implements IUser {
  id: number;

  nome: string;

  sobrenome: string;

  email: string;

  senha: string;

  dtcadastro: Date;

  modules: IModules[];

  perms: string;
}
