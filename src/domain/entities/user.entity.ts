import { IAccess } from './access.entity';

export interface IUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  dtcadastro: Date;
  access: IAccess[];
  deletado: string;
  perms: string;
}
