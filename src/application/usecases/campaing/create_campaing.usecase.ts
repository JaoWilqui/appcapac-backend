import { BadRequestException } from '@nestjs/common';
import { ICreateCampaing } from 'src/domain/dto/campaing/create_campaing.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICampaingRepository } from 'src/domain/repositories/campaing.repository';
import { ICreateCampaingUsecase } from 'src/domain/usecases/campaing/icreate_campaing.usecase';

export class CreateCampaingUsecase implements ICreateCampaingUsecase {
  constructor(private campaingRepository: ICampaingRepository) {}

  async inserCampaing(campaing: ICreateCampaing) {
    try {
      const createCampaing: ICampaing = campaing;

      await this.campaingRepository.insert(createCampaing);

      return { status: 200, message: 'Campanha registrada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
