import { IFiles } from 'src/domain/entities/files.entity';

export interface IFindFileByIdUserUsecase {
  findFileById(id: number): Promise<IFiles>;
}
