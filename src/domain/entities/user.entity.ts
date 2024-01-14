import { Perms } from 'src/infrastructure/enum/permissions.enum';
import { IModules } from './modules.entity';

export interface IUser {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  dtcadastro?: Date;
  modules: IModules[];
  cpf: string;
  deletado?: Date;
  perms: Perms;
}
