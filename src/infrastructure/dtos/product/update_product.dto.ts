import { IsNotEmpty } from 'class-validator';
import { IUpdateProduct } from 'src/domain/dto/product/update_product.dto';

export class UpdateProductDTO implements IUpdateProduct {
  @IsNotEmpty({ message: 'O campo ID é obrigatório' })
  id: number;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;
}
