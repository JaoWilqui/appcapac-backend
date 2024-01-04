export class IUpdateUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  modules: number[];
  perms: string;
}
