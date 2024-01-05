import { BadRequestException } from '@nestjs/common';
import { ICreateVideos } from 'src/domain/dto/videos/create_videos.dto';
import { IVideos } from 'src/domain/entities/videos.entity';
import { IVideosRepository } from 'src/domain/repositories/videos.repository';
import { ICreateVideoUsecase } from 'src/domain/usecases/videos/icreate_videos.usecase';

export class CreateVideosUsecase implements ICreateVideoUsecase {
  constructor(private videosRepository: IVideosRepository) {}

  async insertVideo(video: ICreateVideos) {
    try {
      const createVideo: IVideos = video;

      await this.videosRepository.insert(createVideo);

      return { status: 200, message: 'Video registrado com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
