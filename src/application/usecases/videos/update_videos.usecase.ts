import { BadRequestException } from '@nestjs/common';
import {} from 'src/domain/dto/user/create_user.dto';
import { IUpdateVideos } from 'src/domain/dto/videos/update_videos.dto';
import { IVideos } from 'src/domain/entities/videos.entity';
import { IVideosRepository } from 'src/domain/repositories/videos.repository';
import { IUpdateVideosUsecase } from 'src/domain/usecases/videos/iupdate_videos.usecase';

export class UpdateVideosUsecase implements IUpdateVideosUsecase {
  constructor(private videosRepository: IVideosRepository) {}
  async updateVideos(id: number, video: IUpdateVideos) {
    try {
      const insertVideo: IVideos = video;
      await this.videosRepository.updateContent(id, insertVideo);
      return { status: 200, message: 'Video atualziado com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
