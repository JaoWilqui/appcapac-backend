import { IOperatorRepository } from 'src/domain/repositories/operators.repository';
import { IFindOperatorByIdUserUsecase } from 'src/domain/usecases/operators/ifind_operator_by_id.usecase';

export class FindOperatorByIdUserUsecase implements IFindOperatorByIdUserUsecase {
  constructor(private operatorRepository: IOperatorRepository) {}
  async findOperatorById(id: number) {
    try {
      const video = await this.operatorRepository.findById(id);
      return video;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar a Operadora!');
    }
  }
}
