export interface IUpdatePasswordUsecase {
  updatePassword(id: number, senha: string): Promise<any>;
}
