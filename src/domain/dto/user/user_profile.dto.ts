import { IAccess } from 'src/domain/entities/access.entity';

export class IUserProfile {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dtcadastro: Date;
  access: IAccess[];
  perms: string;
}
