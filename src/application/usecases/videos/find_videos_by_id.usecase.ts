import { IVideosRepository } from 'src/domain/repositories/videos.repository';
import { IFindVideosByIdUserUsecase } from 'src/domain/usecases/videos/ifind_videos_by_id.usecase';

export class FindVideosByIdUserUsecase implements IFindVideosByIdUserUsecase {
  constructor(private videosRepository: IVideosRepository) {}
  async findVideosById(id: number) {
    try {
      const video = await this.videosRepository.findById(id);
      return video;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar o video!');
    }
  }
}
