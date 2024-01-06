import { AppError } from 'src/application/error';
import { IUpdateImages } from 'src/domain/dto/images/update_image.dto';
import {} from 'src/domain/dto/user/create_user.dto';
import { IImagesRepository } from 'src/domain/repositories/images.repository';
import { IUpdateImagesUsecase } from 'src/domain/usecases/images/iupdate_image.usecase';

export class UpdateImagesUsecase implements IUpdateImagesUsecase {
  constructor(private imagesRepository: IImagesRepository) {}

  async updateImages(id: number, image: IUpdateImages) {
    try {
      await this.imagesRepository.updateContent(id, image);

      return { status: 200, message: 'Imagem atualizada com sucesso!' };
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar atualizar a imagem!', 400);
    }
  }
}
