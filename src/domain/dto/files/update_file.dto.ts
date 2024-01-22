import { IOperator } from 'src/domain/entities/operators.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class IUpdateFiles {
  id: number;
  nome: string;

  descricao: string;

  fileRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  product: IProduct;

  tipo: string;
}
