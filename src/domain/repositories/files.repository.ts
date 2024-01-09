import { FilesEntity } from 'src/infrastructure/entities/files.entity';
import { IPaginationDTO } from '../dto/pagination.dto';
import { IFiles } from '../entities/files.entity';

export interface IFilesRepository {
  updateContent(id: number, file: IFiles): Promise<void>;
  insert(file: IFiles): Promise<FilesEntity>;
  findAll(params?: IPaginationDTO<IFiles>): Promise<IPaginationDTO<IFiles>>;
  findById(id: number): Promise<IFiles>;
  deleteById(id: number): Promise<void>;
}
