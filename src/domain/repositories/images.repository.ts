import { ImagesEntity } from 'src/infrastructure/entities/images.entity';
import { IPaginationDTO } from '../dto/pagination.dto';
import { IImages } from '../entities/images.entity';

export interface IImagesRepository {
  updateContent(id: number, images: IImages): Promise<void>;
  insert(images: IImages): Promise<ImagesEntity>;
  findAll(params?: IPaginationDTO<IImages>): Promise<IPaginationDTO<IImages>>;
  findById(id: number): Promise<IImages>;
  deleteById(id: number): Promise<void>;
}
