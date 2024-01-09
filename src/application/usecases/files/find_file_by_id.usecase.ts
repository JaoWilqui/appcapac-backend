import { AppError } from 'src/application/error';
import { IFilesRepository } from 'src/domain/repositories/files.repository';
import { IFindFileByIdUserUsecase } from 'src/domain/usecases/files/ifind_file_by_id.usecase';

export class FindFilesByIdUserUsecase implements IFindFileByIdUserUsecase {
  constructor(private filesRepository: IFilesRepository) {}
  async findFileById(id: number) {
    try {
      const file = await this.filesRepository.findById(id);
      return file;
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar retornar o arquivo!', 400);
    }
  }
}
