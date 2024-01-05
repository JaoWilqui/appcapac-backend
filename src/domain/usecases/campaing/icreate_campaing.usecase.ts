import { ICreateCampaing } from 'src/domain/dto/campaing/create_campaing.dto';

export interface ICreateCampaingUsecase {
  insertCampaing(campaing: ICreateCampaing): Promise<any>;
}
