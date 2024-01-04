import { IsNotEmpty } from 'class-validator';
import { ICreateCategory } from 'src/domain/dto/Category/create_Category.dto';

export class CreateCateogryDTO implements ICreateCategory {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;
}
