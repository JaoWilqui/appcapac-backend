import { IsNotEmpty } from 'class-validator';
import { IUpdateFiles } from 'src/domain/dto/files/update_file.dto';
import { ICategory } from 'src/domain/entities/category.entity';

export class UpdateFileDTO implements IUpdateFiles {
  id: number;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  fileRelativePath: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  tipo: string;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  category: ICategory;
}
