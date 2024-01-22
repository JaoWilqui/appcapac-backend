import { IProduct } from 'src/domain/entities/product.entity';

export class GetProductDto implements IProduct {
  id: number;

  descricao: string;

  nome: string;

  dtcadastro: Date;
}
