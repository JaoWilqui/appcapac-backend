import { Perms } from 'src/infrastructure/enum/permissions.enum';

export class ICreatetUser {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  modules: number[];
  perms: Perms;
}
