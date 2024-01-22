import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IProduct } from 'src/domain/entities/product.entity';

export class ICreateVideos {
  descricao: string;

  link: string;

  nome: string;

  product: IProduct;

  campaing: ICampaing;
}
