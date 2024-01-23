import { IsNotEmpty } from 'class-validator';
import { ICreateImages } from 'src/domain/dto/images/create_images.dto';
import { IOperator } from 'src/domain/entities/operators.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class CreateImagesDTO implements ICreateImages {
  @IsNotEmpty({ message: 'O campo cidade é obrigatório' })
  cidade: string;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo imageRelativePath é obrigatório' })
  imageRelativePath: string;

  @IsNotEmpty({ message: 'O campo uf é obrigatório' })
  uf: string;

  @IsNotEmpty({ message: 'O campo adesao é obrigatório' })
  adesao: AdhesionEnum;

  @IsNotEmpty({ message: 'O campo operator é obrigatório' })
  operator: IOperator;

  @IsNotEmpty({ message: 'O campo product é obrigatório' })
  product: IProduct;

  // @IsNotEmpty({ message: 'O campo campaing é obrigatório' })
  // campaing: ICampaing;
}
