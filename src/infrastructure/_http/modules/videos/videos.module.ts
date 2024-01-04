import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateVideosUsecase } from 'src/application/usecases/videos/create_videos.usecase';
import { DeleteVideosUsecase } from 'src/application/usecases/videos/delete_videos.usecase';
import { FindAllVideosUsecase } from 'src/application/usecases/videos/find_all_videos.usecase';
import { FindVideosByIdUserUsecase } from 'src/application/usecases/videos/find_videos_by_id.usecase';
import { UpdateVideosUsecase } from 'src/application/usecases/videos/update_videos.usecase';
import { IVideosRepository } from 'src/domain/repositories/videos.repository';
import { VideosEntity } from 'src/infrastructure/entities/videos.entity';
import { VideosRepository } from 'src/infrastructure/repositories/videos.repository';
import { VideosController } from './controllers/videos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VideosEntity])],
  controllers: [VideosController],
  providers: [
    { provide: VideosRepository, useClass: VideosRepository },
    {
      provide: CreateVideosUsecase,
      useFactory: (videosRepository: IVideosRepository) => new CreateVideosUsecase(videosRepository),
      inject: [VideosRepository],
    },
    {
      provide: UpdateVideosUsecase,
      useFactory: (videosRepository: IVideosRepository) => new UpdateVideosUsecase(videosRepository),

      inject: [VideosRepository],
    },
    {
      provide: DeleteVideosUsecase,
      useFactory: (videosRepository: IVideosRepository) => new DeleteVideosUsecase(videosRepository),
      inject: [VideosRepository],
    },
    {
      provide: FindAllVideosUsecase,
      useFactory: (videosRepository: IVideosRepository) => new FindAllVideosUsecase(videosRepository),
      inject: [VideosRepository],
    },
    {
      provide: FindVideosByIdUserUsecase,
      useFactory: (videosRepository: IVideosRepository) => new FindVideosByIdUserUsecase(videosRepository),
      inject: [VideosRepository],
    },
  ],
})
export class VideosModule {}
