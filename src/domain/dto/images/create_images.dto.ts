import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IOperator } from 'src/domain/entities/operators.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class ICreateImages {
  nome: string;

  descricao: string;

  imageRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  cidade: string;

  operator: IOperator;

  product: IProduct;

  campaing: ICampaing;
}
