import { IAccess } from 'src/domain/entities/access.entity';

export class IInsertUser {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  dtcadastro: Date;
  access: IAccess[];
  deletado?: string;
  perms: string;
}
