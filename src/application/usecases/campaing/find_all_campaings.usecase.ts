import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICampaingRepository } from 'src/domain/repositories/campaing.repository';
import { IFindAllCampaingUsecase } from 'src/domain/usecases/campaing/ifind_all_campaing.usecase';

export class FindAllCampaingUsecase implements IFindAllCampaingUsecase {
  constructor(private campaingRepository: ICampaingRepository) {}
  async findAllCampaing(params: IPaginationDTO<ICampaing>) {
    try {
      const campaing = await this.campaingRepository.findAll(params);
      return campaing;
    } catch (error) {
      console.log(error);
      throw Error('Ocorreu um erro ao tentar retornar as Campanhas!');
    }
  }
}
