export interface IDeleteCampaingUsecase {
  deleteCampaing(id: number): Promise<any>;
}
