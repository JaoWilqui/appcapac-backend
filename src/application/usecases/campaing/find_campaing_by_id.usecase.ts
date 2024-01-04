import { ICampaingRepository } from 'src/domain/repositories/campaing.repository';
import { IFindCampaingByIdUserUsecase } from 'src/domain/usecases/campaing/ifind_campaing_by_id.usecase';

export class FindCampaingByIdUserUsecase implements IFindCampaingByIdUserUsecase {
  constructor(private campaingRepository: ICampaingRepository) {}
  async findCampaingById(id: number) {
    try {
      const video = await this.campaingRepository.findById(id);
      return video;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar a Campanha!');
    }
  }
}
