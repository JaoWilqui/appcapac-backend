import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IImages } from 'src/domain/entities/images.entity';

export interface IFindAllImagesUsecase {
  findAllImages(params: IPaginationDTO<IImages>): Promise<IPaginationDTO<IImages>>;
}
