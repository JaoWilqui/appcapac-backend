import { IFiles } from './files.entity';
import { IImages } from './images.entity';
import { IVideos } from './videos.entity';

export class IProduct {
  id?: number;

  nome: string;

  descricao: string;

  dtcadastro?: Date;

  arquivos?: IFiles[];

  videos?: IVideos[];

  images?: IImages[];

  deletado?: Date;
}
