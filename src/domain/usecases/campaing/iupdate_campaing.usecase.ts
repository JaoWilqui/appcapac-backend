import { IUpdateCampaing } from 'src/domain/dto/campaing/update_campaing.dto';

export interface IUpdateCampaingUsecase {
  updateCampaing(id: number, campaing: IUpdateCampaing): Promise<any>;
}
