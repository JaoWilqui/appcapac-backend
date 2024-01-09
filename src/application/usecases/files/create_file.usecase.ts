import { AppError } from 'src/application/error';
import { IFiles } from 'src/domain/entities/files.entity';
import { IFilesRepository } from 'src/domain/repositories/files.repository';
import { ICreateFileUsecase } from 'src/domain/usecases/files/icreate_file.usecase';

export class CreateFileUsecase implements ICreateFileUsecase {
  constructor(private filesRepository: IFilesRepository) {}

  async insertFile(file: IFiles) {
    try {
      const createdFile = await this.filesRepository.insert(file);

      return { status: 200, message: 'Arquivo registrado com sucesso!', data: createdFile };
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar cadastrar o Arquivo!', 400);
    }
  }
}
