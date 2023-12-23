import { IPaginationDTO } from 'src/domain/dto/pagination.dto';

export interface TodoRepository<T> {
  insert(content: T): Promise<void>;
  findAll(params: IPaginationDTO<T>): Promise<IPaginationDTO<T>>;
  findById(id: number): Promise<T>;
  updateContent(id: number, content: T): Promise<void>;
  deleteById(id: number): Promise<void>;
}
