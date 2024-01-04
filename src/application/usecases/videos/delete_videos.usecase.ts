import { IVideosRepository } from 'src/domain/repositories/videos.repository';
import { IDeleteVideoUsecase } from 'src/domain/usecases/videos/idelete_videos.usecase';

export class DeleteVideosUsecase implements IDeleteVideoUsecase {
  constructor(private videosRepository: IVideosRepository) {}
  async deleteVideo(id: number) {
    try {
      await this.videosRepository.deleteById(id);
      return { status: 200, message: 'Video deletado com sucesso!' };
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar deletar o video!');
    }
  }
}
