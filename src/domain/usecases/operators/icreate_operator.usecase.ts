import { ICreateOperator } from 'src/domain/dto/operators/create_operator';

export interface ICreateOperatorUsecase {
  insertOperator(operator: ICreateOperator): Promise<any>;
}
