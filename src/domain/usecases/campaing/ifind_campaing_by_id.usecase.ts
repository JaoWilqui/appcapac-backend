import { ICampaing } from 'src/domain/entities/campaing.entity';

export interface IFindCampaingByIdUserUsecase {
  findCampaingById(id: number): Promise<ICampaing>;
}
