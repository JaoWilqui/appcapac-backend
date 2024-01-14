import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IOperator } from 'src/domain/entities/operators.entity';

export interface IFindAllOperatorUsecase {
  findAllOperator(params: IPaginationDTO<IOperator>): Promise<IPaginationDTO<IOperator>>;
}
