import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IVideos } from 'src/domain/entities/videos.entity';
import { IVideosRepository } from 'src/domain/repositories/videos.repository';
import { IFindAllVideosUsecase } from 'src/domain/usecases/videos/ifind_all_videos.usecase';

export class FindAllVideosUsecase implements IFindAllVideosUsecase {
  constructor(private videosRepository: IVideosRepository) {}
  async findAllVideos(params: IPaginationDTO<IVideos>) {
    try {
      const videos = await this.videosRepository.findAll(params);
      return videos;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar os videos!');
    }
  }
}
