export interface IDeleteVideoUsecase {
  deleteVideo(id: number): Promise<any>;
}
