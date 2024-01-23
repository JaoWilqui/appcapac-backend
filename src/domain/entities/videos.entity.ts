import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';
import { ICampaing } from './campaing.entity';
import { IProduct } from './product.entity';

export class IVideos {
  id?: number;

  deletado?: Date;

  descricao: string;

  link: string;

  nome: string;

  product: IProduct;

  uf: string;
  cidade: string;

  adesao: AdhesionEnum;

  campaing: ICampaing;

  dtcadastro?: Date;
}
