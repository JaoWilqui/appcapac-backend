import { CampaingEntity } from 'src/infrastructure/entities/campaing.entity';
import { CampaingController } from './controllers/campaing.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCampaingUsecase } from 'src/application/usecases/campaing/create_campaing.usecase';
import { DeleteCampaingUsecase } from 'src/application/usecases/campaing/delete_campaing.usecase';
import { FindAllCampaingUsecase } from 'src/application/usecases/campaing/find_all_campaings.usecase';
import { FindCampaingByIdUserUsecase } from 'src/application/usecases/campaing/find_campaing_by_id.usecase';
import { UpdateCampaingUsecase } from 'src/application/usecases/campaing/update_campaing.usecase';
import { ICampaingRepository } from 'src/domain/repositories/campaing.repository';
import { CampaingRepository } from 'src/infrastructure/repositories/campaing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CampaingEntity])],
  controllers: [CampaingController],
  providers: [
    { provide: CampaingRepository, useClass: CampaingRepository },
    {
      provide: CreateCampaingUsecase,
      useFactory: (campaingRepository: ICampaingRepository) => new CreateCampaingUsecase(campaingRepository),
      inject: [CampaingRepository],
    },
    {
      provide: UpdateCampaingUsecase,
      useFactory: (campaingRepository: ICampaingRepository) => new UpdateCampaingUsecase(campaingRepository),
      inject: [CampaingRepository],
    },
    {
      provide: DeleteCampaingUsecase,
      useFactory: (campaingRepository: ICampaingRepository) => new DeleteCampaingUsecase(campaingRepository),
      inject: [CampaingRepository],
    },
    {
      provide: FindAllCampaingUsecase,
      useFactory: (campaingRepository: ICampaingRepository) => new FindAllCampaingUsecase(campaingRepository),
      inject: [CampaingRepository],
    },
    {
      provide: FindCampaingByIdUserUsecase,
      useFactory: (campaingRepository: ICampaingRepository) => new FindCampaingByIdUserUsecase(campaingRepository),
      inject: [CampaingRepository],
    },
  ],
})
export class CampaingModule {}
