import { IUpdateImages } from 'src/domain/dto/images/update_image.dto';

export interface IUpdateImagesUsecase {
  updateImages(id: number, images: IUpdateImages): Promise<any>;
}
