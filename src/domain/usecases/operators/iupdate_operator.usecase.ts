import { IUpdateOperator } from 'src/domain/dto/operators/update_operator';

export interface IUpdateOperatorUsecase {
  updateOperator(id: number, Operator: IUpdateOperator): Promise<any>;
}
