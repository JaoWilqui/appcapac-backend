import { IOperator } from 'src/domain/entities/operators.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class ICreateFiles {
  nome: string;

  descricao: string;

  fileRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  cidade: string;

  operator: IOperator;

  product: IProduct;

  tipo: string;
}
