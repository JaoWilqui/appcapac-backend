import { ICampaingRepository } from 'src/domain/repositories/campaing.repository';
import { IDeleteCampaingUsecase } from 'src/domain/usecases/campaing/idelete_campaing.usecase';

export class DeleteCampaingUsecase implements IDeleteCampaingUsecase {
  constructor(private campaingRepository: ICampaingRepository) {}
  async deleteCampaing(id: number) {
    try {
      await this.campaingRepository.deleteById(id);
      return { status: 200, message: 'Campanha deletada com sucesso!' };
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar deletar a Campanha!');
    }
  }
}
