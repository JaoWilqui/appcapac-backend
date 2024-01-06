import { IImages } from 'src/domain/entities/images.entity';

export interface IFindImagesByIdUserUsecase {
  findImagesById(id: number): Promise<IImages>;
}
