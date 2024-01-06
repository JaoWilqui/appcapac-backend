import { AppError } from 'src/application/error';
import { IImagesRepository } from 'src/domain/repositories/images.repository';
import { IFindImagesByIdUserUsecase } from 'src/domain/usecases/images/ifind_image_by_id.usecase';

export class FindImagesByIdUserUsecase implements IFindImagesByIdUserUsecase {
  constructor(private imagesRepository: IImagesRepository) {}
  async findImagesById(id: number) {
    try {
      const image = await this.imagesRepository.findById(id);
      return image;
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar retornar a imagem!', 400);
    }
  }
}
