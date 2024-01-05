import { ICreateVideos } from 'src/domain/dto/videos/create_videos.dto';

export interface ICreateVideoUsecase {
  insertVideo(user: ICreateVideos): Promise<any>;
}
