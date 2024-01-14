import { BadRequestException } from '@nestjs/common';
import { IUpdateOperator } from 'src/domain/dto/operators/update_operator';
import { IOperator } from 'src/domain/entities/operators.entity';
import { IOperatorRepository } from 'src/domain/repositories/operators.repository';
import { IUpdateOperatorUsecase } from 'src/domain/usecases/operators/iupdate_operator.usecase';

export class UpdateOperatorUsecase implements IUpdateOperatorUsecase {
  constructor(private operatorRepository: IOperatorRepository) {}
  async updateOperator(id: number, operator: IUpdateOperator) {
    try {
      const insertOperator: IOperator = operator;
      await this.operatorRepository.updateContent(id, insertOperator);
      return { status: 200, message: 'Operadora atualziada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
