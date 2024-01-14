import { IPaginationDTO } from '../dto/pagination.dto';
import { IOperator } from '../entities/operators.entity';

export interface IOperatorRepository {
  updateContent(id: number, user: IOperator): Promise<void>;
  insert(operator: IOperator): Promise<void>;
  findAll(params?: IPaginationDTO<IOperator>): Promise<IPaginationDTO<IOperator>>;
  findById(id: number): Promise<IOperator>;
  deleteById(id: number): Promise<void>;
}
