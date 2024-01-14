import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatorsController } from './controllers/operators.controller';

import { Module } from '@nestjs/common';
import { CreateOperatorUsecase } from 'src/application/usecases/operators/create_operator.usecase';
import { DeleteOperatorUsecase } from 'src/application/usecases/operators/delete_operator.usecase';
import { FindAllOperatorUsecase } from 'src/application/usecases/operators/find_all_operators.usecase';
import { FindOperatorByIdUserUsecase } from 'src/application/usecases/operators/find_operator_by_id.usecase';
import { UpdateOperatorUsecase } from 'src/application/usecases/operators/update_operator.usecase';
import { IOperatorRepository } from 'src/domain/repositories/operators.repository';
import { OperatorsEntity } from 'src/infrastructure/entities/operators.entity';
import { OperatorsRepository } from 'src/infrastructure/repositories/operators.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OperatorsEntity])],
  controllers: [OperatorsController],
  providers: [
    { provide: OperatorsRepository, useClass: OperatorsRepository },
    {
      provide: CreateOperatorUsecase,
      useFactory: (operatorRepository: IOperatorRepository) =>
        new CreateOperatorUsecase(operatorRepository),
      inject: [OperatorsRepository],
    },
    {
      provide: UpdateOperatorUsecase,
      useFactory: (operatorRepository: IOperatorRepository) =>
        new UpdateOperatorUsecase(operatorRepository),
      inject: [OperatorsRepository],
    },
    {
      provide: DeleteOperatorUsecase,
      useFactory: (operatorRepository: IOperatorRepository) =>
        new DeleteOperatorUsecase(operatorRepository),
      inject: [OperatorsRepository],
    },
    {
      provide: FindAllOperatorUsecase,
      useFactory: (operatorRepository: IOperatorRepository) =>
        new FindAllOperatorUsecase(operatorRepository),
      inject: [OperatorsRepository],
    },
    {
      provide: FindOperatorByIdUserUsecase,
      useFactory: (operatorRepository: IOperatorRepository) =>
        new FindOperatorByIdUserUsecase(operatorRepository),
      inject: [OperatorsRepository],
    },
  ],
})
export class OperatorsModule {}
