import { ICreateVideos } from 'src/domain/dto/videos/create_videos.dto';

export interface ICreateVideoUsecase {
  inserVideo(user: ICreateVideos): Promise<any>;
}
