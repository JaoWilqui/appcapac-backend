import { AppError } from 'src/application/error';
import { IFilesRepository } from 'src/domain/repositories/files.repository';
import { IDeleteFileUsecase } from 'src/domain/usecases/files/idelete_file.usecase';

export class DeleteFileUsecase implements IDeleteFileUsecase {
  constructor(private filesRepository: IFilesRepository) {}

  async deleteFile(id: number) {
    try {
      await this.filesRepository.deleteById(id);

      return { status: 200, message: 'Arquivo deletada com sucesso!' };
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar cadastrar o Arquivo!', 401);
    }
  }
}
