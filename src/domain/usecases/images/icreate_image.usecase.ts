import { ICreateImages } from 'src/domain/dto/images/create_images.dto';

export interface ICreateImagesUsecase {
  insertImages(images: ICreateImages): Promise<any>;
}
