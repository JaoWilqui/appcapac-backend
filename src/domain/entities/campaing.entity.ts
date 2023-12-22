import { IImages } from './images.entity';
import { IVideos } from './videos.entity';

export class ICampaing {
  id: number;

  nome: string;

  descricao: string;

  dtcadastro: Date;

  dtinicio: Date;

  dtfim: Date;

  deletado: string;

  status: string;

  videos: IVideos[];

  images: IImages[];
}
