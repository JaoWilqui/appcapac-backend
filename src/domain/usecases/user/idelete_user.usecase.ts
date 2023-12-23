export interface IDeleteUserUsecase {
  deleteUser(id: number): Promise<any>;
}
