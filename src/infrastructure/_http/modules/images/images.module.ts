import { ImagesRepository } from 'src/infrastructure/repositories/images.repository';
import { ImagesController } from './controllers/images.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateImageUsecase } from 'src/application/usecases/images/create_image.usecase';
import { DeleteImageUsecase } from 'src/application/usecases/images/delete_image.usecase';
import { FindAllImagesUsecase } from 'src/application/usecases/images/find_all_images.usecase';
import { FindImagesByIdUserUsecase } from 'src/application/usecases/images/find_image_by_id.usecase';
import { UpdateImagesUsecase } from 'src/application/usecases/images/update_image.usecase';
import { IImagesRepository } from 'src/domain/repositories/images.repository';
import { ImagesEntity } from 'src/infrastructure/entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity])],
  controllers: [ImagesController],
  providers: [
    { provide: ImagesRepository, useClass: ImagesRepository },
    {
      provide: CreateImageUsecase,
      useFactory: (imagesRepository: IImagesRepository) => new CreateImageUsecase(imagesRepository),
      inject: [ImagesRepository],
    },
    {
      provide: UpdateImagesUsecase,
      useFactory: (imagesRepository: IImagesRepository) => new UpdateImagesUsecase(imagesRepository),
      inject: [ImagesRepository],
    },
    {
      provide: DeleteImageUsecase,
      useFactory: (imagesRepository: IImagesRepository) => new DeleteImageUsecase(imagesRepository),
      inject: [ImagesRepository],
    },
    {
      provide: FindAllImagesUsecase,
      useFactory: (imagesRepository: IImagesRepository) => new FindAllImagesUsecase(imagesRepository),
      inject: [ImagesRepository],
    },
    {
      provide: FindImagesByIdUserUsecase,
      useFactory: (imagesRepository: IImagesRepository) => new FindImagesByIdUserUsecase(imagesRepository),
      inject: [ImagesRepository],
    },
  ],
})
export class ImagesModule {}
