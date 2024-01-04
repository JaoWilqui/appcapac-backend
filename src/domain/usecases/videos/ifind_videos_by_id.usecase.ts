import { IVideos } from 'src/domain/entities/videos.entity';

export interface IFindVideosByIdUserUsecase {
  findVideosById(id: number): Promise<IVideos>;
}
