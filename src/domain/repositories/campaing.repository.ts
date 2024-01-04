import { IPaginationDTO } from '../dto/pagination.dto';
import { ICampaing } from '../entities/campaing.entity';

export interface ICampaingRepository {
  updateContent(id: number, campaing: ICampaing): Promise<void>;
  insert(campaing: ICampaing): Promise<void>;
  findAll(params: IPaginationDTO<ICampaing>): Promise<IPaginationDTO<ICampaing>>;
  findById(id: number): Promise<ICampaing>;
  deleteById(id: number): Promise<void>;
}
