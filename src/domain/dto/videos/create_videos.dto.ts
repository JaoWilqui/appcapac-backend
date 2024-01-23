import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class ICreateVideos {
  descricao: string;

  link: string;

  nome: string;

  product: IProduct;

  uf: string;

  adesao: AdhesionEnum;

  cidade: string;

  // campaing: ICampaing;
}
