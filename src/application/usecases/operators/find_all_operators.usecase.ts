import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IOperator } from 'src/domain/entities/operators.entity';
import { IOperatorRepository } from 'src/domain/repositories/operators.repository';
import { IFindAllOperatorUsecase } from 'src/domain/usecases/operators/ifind_all_operator.usecase';

export class FindAllOperatorUsecase implements IFindAllOperatorUsecase {
  constructor(private operatorRepository: IOperatorRepository) {}
  async findAllOperator(params: IPaginationDTO<IOperator> & IOperator) {
    try {
      const operator = await this.operatorRepository.findAll(params);
      return operator;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar as Operadoras!');
    }
  }
}
