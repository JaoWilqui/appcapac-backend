import { CampaingEnum } from 'src/infrastructure/enum/campaning.enum';
import { IImages } from './images.entity';
import { IVideos } from './videos.entity';

export class ICampaing {
  id?: number;

  nome: string;

  descricao: string;

  dtcadastro?: Date;

  dtinicio: Date;

  dtfim: Date;

  deletado?: Date;

  status: CampaingEnum;

  videos?: IVideos[];

  images?: IImages[];
}
