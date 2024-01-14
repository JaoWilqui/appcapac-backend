import { BadRequestException } from '@nestjs/common';
import { ICreateOperator } from 'src/domain/dto/operators/create_operator';
import { IOperator } from 'src/domain/entities/operators.entity';
import { IOperatorRepository } from 'src/domain/repositories/operators.repository';
import { ICreateOperatorUsecase } from 'src/domain/usecases/operators/icreate_operator.usecase';

export class CreateOperatorUsecase implements ICreateOperatorUsecase {
  constructor(private operatorRepository: IOperatorRepository) {}

  async insertOperator(operator: ICreateOperator) {
    try {
      const createOperator: IOperator = operator;

      await this.operatorRepository.insert(createOperator);

      return { status: 200, message: 'Operadora registrada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
