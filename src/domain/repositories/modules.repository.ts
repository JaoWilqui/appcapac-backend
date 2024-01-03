import { IPaginationDTO } from '../dto/pagination.dto';
import { IModules } from '../entities/modules.entity';

export interface IModulesRepository {
  updateContent(id: number, user: IModules): Promise<void>;
  insert(module: IModules): Promise<void>;
  findAll(params?: IPaginationDTO<IModules>): Promise<IPaginationDTO<IModules>>;
  findById(id: number): Promise<IModules>;
  deleteById(id: number): Promise<void>;
}
