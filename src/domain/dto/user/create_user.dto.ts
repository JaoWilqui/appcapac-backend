import { IAccess } from 'src/domain/entities/access.entity';

export class ICreatetUser {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  access?: IAccess[];
  perms: string;
}
