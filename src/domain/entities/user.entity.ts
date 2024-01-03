import { IModules } from './modules.entity';

export interface IUser {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  dtcadastro?: Date;
  modules: IModules[];
  deletado?: string;
  perms: string;
}
