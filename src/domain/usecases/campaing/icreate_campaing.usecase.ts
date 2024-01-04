import { ICreateCampaing } from 'src/domain/dto/campaing/create_campaing.dto';

export interface ICreateCampaingUsecase {
  inserCampaing(campaing: ICreateCampaing): Promise<any>;
}
