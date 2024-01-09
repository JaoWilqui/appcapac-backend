import { AppError } from 'src/application/error';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IFiles } from 'src/domain/entities/files.entity';
import { IFilesRepository } from 'src/domain/repositories/files.repository';
import { IFindAllFileUsecase } from 'src/domain/usecases/files/ifind_all_file.usecase';

export class FindAllFileUsecase implements IFindAllFileUsecase {
  constructor(private filesRepository: IFilesRepository) {}

  async findAllFile(params: IPaginationDTO<IFiles>) {
    try {
      const files = await this.filesRepository.findAll(params);
      return files;
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar retornar os arquivos!', 400);
    }
  }
}
