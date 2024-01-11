import { IModules } from 'src/domain/entities/modules.entity';
import { IUser } from 'src/domain/entities/user.entity';
import { Perms } from 'src/infrastructure/enum/permissions.enum';

export class GetUserDto implements IUser {
  id: number;

  nome: string;

  cpf: string;

  sobrenome: string;

  email: string;

  senha: string;

  dtcadastro: Date;

  modules: IModules[];

  perms: Perms;
}
