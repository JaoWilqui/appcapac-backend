import { AppError } from 'src/application/error';
import { IUpdateFiles } from 'src/domain/dto/files/update_file.dto';
import { IFilesRepository } from 'src/domain/repositories/files.repository';
import { IUpdateFilesUsecase } from 'src/domain/usecases/files/iupdate_file.usecase';

export class UpdateFilesUsecase implements IUpdateFilesUsecase {
  constructor(private filesRepository: IFilesRepository) {}

  async updateFile(id: number, file: IUpdateFiles) {
    try {
      await this.filesRepository.updateContent(id, file);
      return { status: 200, message: 'Imagem atualizada com sucesso!' };
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar atualizar a imagem!', 400);
    }
  }
}
