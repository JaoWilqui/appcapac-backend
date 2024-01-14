import { IOperator } from 'src/domain/entities/operators.entity';

export interface IFindOperatorByIdUserUsecase {
  findOperatorById(id: number): Promise<IOperator>;
}
