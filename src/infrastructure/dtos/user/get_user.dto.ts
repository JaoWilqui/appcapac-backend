import { IAccess } from 'src/domain/entities/access.entity';
import { IUser } from 'src/domain/entities/user.entity';

export class GetUserDto implements IUser {
  id: number;

  nome: string;

  sobrenome: string;

  email: string;

  senha: string;

  dtcadastro: Date;

  access: IAccess[];

  perms: string;
}
