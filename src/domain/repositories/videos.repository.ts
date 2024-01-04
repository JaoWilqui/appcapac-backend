import { IPaginationDTO } from '../dto/pagination.dto';
import { IVideos } from '../entities/videos.entity';

export interface IVideosRepository {
  updateContent(id: number, video: IVideos): Promise<void>;
  insert(video: IVideos): Promise<void>;
  findAll(params: IPaginationDTO<IVideos>): Promise<IPaginationDTO<IVideos>>;
  findById(id: number): Promise<IVideos>;
  deleteById(id: number): Promise<void>;
}
