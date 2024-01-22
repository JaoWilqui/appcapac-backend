import { IsNotEmpty } from 'class-validator';
import { ICreateFiles } from 'src/domain/dto/files/create_file.dto';
import { IOperator } from 'src/domain/entities/operators.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class CreateFileDTO implements ICreateFiles {
  @IsNotEmpty({ message: 'O campo fileRelativePath é obrigatório' })
  fileRelativePath: string;

  @IsNotEmpty({ message: 'O campo tipo é obrigatório' })
  tipo: string;

  @IsNotEmpty({ message: 'O campo uf é obrigatório' })
  uf: string;

  @IsNotEmpty({ message: 'O campo adesao é obrigatório' })
  adesao: AdhesionEnum;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo operator é obrigatório' })
  operator: IOperator;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo product é obrigatório' })
  product: IProduct;
}
