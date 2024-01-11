import { IModules } from 'src/domain/entities/modules.entity';

export class IUserProfile {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  cpf: string;
  dtcadastro: Date;
  modules: IModules[];
  perms: string;
}
