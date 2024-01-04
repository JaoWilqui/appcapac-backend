import { IUpdateVideos } from 'src/domain/dto/videos/update_videos.dto';

export interface IUpdateVideosUsecase {
  updateVideos(id: number, user: IUpdateVideos): Promise<any>;
}
