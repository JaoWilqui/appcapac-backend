import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IVideos } from 'src/domain/entities/videos.entity';

export interface IFindAllVideosUsecase {
  findAllVideos(params: IPaginationDTO<IVideos>): Promise<IPaginationDTO<IVideos>>;
}
