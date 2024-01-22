import { ICampaing } from './campaing.entity';
import { IProduct } from './product.entity';

export class IVideos {
  id?: number;

  deletado?: Date;

  descricao: string;

  link: string;

  nome: string;

  product: IProduct;

  campaing: ICampaing;

  dtcadastro?: Date;
}
