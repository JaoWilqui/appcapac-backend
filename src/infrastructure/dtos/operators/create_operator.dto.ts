import { IsNotEmpty } from 'class-validator';
import { ICreateOperator } from 'src/domain/dto/operators/create_operator';

export class CreateOperatorDTO implements ICreateOperator {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;
}
