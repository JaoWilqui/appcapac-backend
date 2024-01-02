import { ICreateAccess } from '../dto/access/create_access.dto';
import { IPaginationDTO } from '../dto/pagination.dto';
import { IAccess } from '../entities/access.entity';

export interface IAccesRepository {
  updateContent(id: number): Promise<void>;
  insert(user: ICreateAccess): Promise<void>;
  findAll(params: IPaginationDTO<IAccess>): Promise<any>;
  findById(id: number): Promise<IAccess>;
  deleteById(id: number): Promise<void>;
}
