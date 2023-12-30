import { IAccess } from 'src/domain/entities/access.entity';

export class IUpdateUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  access: IAccess[];
  perms: string;
}
