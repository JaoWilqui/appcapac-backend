import { IOperatorRepository } from 'src/domain/repositories/operators.repository';
import { IDeleteOperatorUsecase } from 'src/domain/usecases/operators/idelete_operator.usecase';

export class DeleteOperatorUsecase implements IDeleteOperatorUsecase {
  constructor(private operatorRepository: IOperatorRepository) {}
  async deleteOperator(id: number) {
    try {
      await this.operatorRepository.deleteById(id);
      return { status: 200, message: 'Operadora deletada com sucesso!' };
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar deletar a Operadora!');
    }
  }
}
