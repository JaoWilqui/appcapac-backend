import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class IUpdateVideos {
  id?: number;

  descricao: string;

  link: string;

  nome: string;

  uf: string;

  adesao: AdhesionEnum;

  cidade: string;

  product: IProduct;

  campaing: ICampaing;
}
