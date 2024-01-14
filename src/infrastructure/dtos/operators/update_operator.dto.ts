import { IsNotEmpty } from 'class-validator';
import { IUpdateOperator } from 'src/domain/dto/operators/update_operator';

export class UpdateOperatorDTO implements IUpdateOperator {
  @IsNotEmpty({ message: 'O campo id é obrigatório' })
  id: number;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;
}
