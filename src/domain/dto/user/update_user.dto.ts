import { Perms } from 'src/infrastructure/enum/permissions.enum';

export class IUpdateUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  cpf: string;

  senha: string;
  modules: number[];
  perms: Perms;
}
