import { IsNotEmpty } from 'class-validator';
import { IUpdateCategory } from 'src/domain/dto/category/update_category.dto';

export class UpdateCategoryDTO implements IUpdateCategory {
  @IsNotEmpty({ message: 'O campo ID é obrigatório' })
  id: number;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;
}
