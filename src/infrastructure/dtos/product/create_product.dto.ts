import { IsNotEmpty } from 'class-validator';
import { ICreateProduct } from 'src/domain/dto/product/create_product.dto';

export class CreateProductDTO implements ICreateProduct {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;
}
