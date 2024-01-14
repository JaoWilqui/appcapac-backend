import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IImages } from 'src/domain/entities/images.entity';
import { IVideos } from 'src/domain/entities/videos.entity';
import { CampaingEnum } from 'src/infrastructure/enum/campaning.enum';

export class GetCampaingDto implements ICampaing {
  id: number;

  dtinicio: Date;
  dtfim: Date;
  status: CampaingEnum;
  videos?: IVideos[];
  images?: IImages[];

  descricao: string;

  nome: string;

  dtcadastro: Date;
}
