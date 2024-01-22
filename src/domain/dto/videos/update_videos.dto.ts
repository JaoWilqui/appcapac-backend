import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IProduct } from 'src/domain/entities/product.entity';

export class IUpdateVideos {
  id?: number;

  descricao: string;

  link: string;

  nome: string;

  product: IProduct;

  campaing: ICampaing;
}
