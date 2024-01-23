import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { IVideos } from 'src/domain/entities/videos.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class GetVideoDto implements IVideos {
  id?: number;
  deletado?: Date;
  uf: string;
  cidade: string;
  adesao: AdhesionEnum;
  dtcadastro?: Date;
  descricao: string;
  link: string;
  nome: string;
  product: IProduct;
  campaing: ICampaing;
}
