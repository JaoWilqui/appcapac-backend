export interface IDeleteFileUsecase {
  deleteFile(id: number): Promise<any>;
}
