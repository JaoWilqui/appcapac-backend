import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';

export interface IFindAllCampaingUsecase {
  findAllCampaing(params: IPaginationDTO<ICampaing>): Promise<IPaginationDTO<ICampaing>>;
}
