import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IImages } from 'src/domain/entities/images.entity';
import { IOperator } from 'src/domain/entities/operators.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class GetImagesDTO implements IImages {
  cidade: string;
  deletado?: Date;
  id?: number;

  nome: string;

  uf: string;

  adesao: AdhesionEnum;

  descricao: string;

  imageRelativePath: string;

  operator: IOperator;

  product: IProduct;

  campaing: ICampaing;

  dtcadastro?: Date;
}
