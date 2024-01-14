import { IOperator } from 'src/domain/entities/operators.entity';

export class GetOperatorDTO implements IOperator {
  id: number;

  nome: string;

  dtcadastro?: Date;
}
