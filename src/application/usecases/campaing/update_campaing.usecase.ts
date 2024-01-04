import { BadRequestException } from '@nestjs/common';
import { IUpdateCampaing } from 'src/domain/dto/campaing/update_campaing.dto';
import {} from 'src/domain/dto/user/create_user.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICampaingRepository } from 'src/domain/repositories/campaing.repository';
import { IUpdateCampaingUsecase } from 'src/domain/usecases/campaing/iupdate_campaing.usecase';

export class UpdateCampaingUsecase implements IUpdateCampaingUsecase {
  constructor(private campaingRepository: ICampaingRepository) {}
  async updateCampaing(id: number, campaing: IUpdateCampaing) {
    try {
      const insertCampaing: ICampaing = campaing;
      await this.campaingRepository.updateContent(id, insertCampaing);
      return { status: 200, message: 'Campanha atualziada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
