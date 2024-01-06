import { AppError } from 'src/application/error';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IImages } from 'src/domain/entities/images.entity';
import { IImagesRepository } from 'src/domain/repositories/images.repository';
import { IFindAllImagesUsecase } from 'src/domain/usecases/images/ifind_all_image.usecase';

export class FindAllImagesUsecase implements IFindAllImagesUsecase {
  constructor(private imagesRepository: IImagesRepository) {}
  async findAllImages(params: IPaginationDTO<IImages>) {
    try {
      const images = await this.imagesRepository.findAll(params);
      return images;
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar retornar as imagens!', 400);
    }
  }
}
