import { AppError } from 'src/application/error';
import { IImagesRepository } from 'src/domain/repositories/images.repository';
import { IDeleteImagesUsecase } from 'src/domain/usecases/images/idelete_image.usecase';

export class DeleteImageUsecase implements IDeleteImagesUsecase {
  constructor(private imagesRepository: IImagesRepository) {}

  async deleteImages(id: number) {
    try {
      await this.imagesRepository.deleteById(id);

      return { status: 200, message: 'Imagem deletada com sucesso!' };
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar cadastrar a imagem!', 401);
    }
  }
}
