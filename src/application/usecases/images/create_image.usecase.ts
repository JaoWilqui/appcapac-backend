import { AppError } from 'src/application/error';
import { IImages } from 'src/domain/entities/images.entity';
import { IImagesRepository } from 'src/domain/repositories/images.repository';
import { ICreateImagesUsecase } from 'src/domain/usecases/images/icreate_image.usecase';

export class CreateImageUsecase implements ICreateImagesUsecase {
  constructor(private imagesRepository: IImagesRepository) {}

  async insertImages(image: IImages) {
    try {
      const createdImage = await this.imagesRepository.insert(image);

      return { status: 200, message: 'Imagem registrado com sucesso!', data: createdImage };
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar cadastrar a imagem!', 400);
    }
  }
}
