export interface IUpdatePasswordUsecase {
  updatePassword(id: number, password: string, confirmPassword: string): Promise<any>;
}
