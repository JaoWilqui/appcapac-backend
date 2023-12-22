import { IAccess } from './access.entity';
import { IFiles } from './files.entity';
import { IImages } from './images.entity';
import { IVideos } from './videos.entity';

export class IModules {
  id: number;

  nome: string;

  dtcadastros: Date;

  deletado: string;

  arquivos: IFiles[];

  access: IAccess[];

  videos: IVideos[];

  images: IImages[];
}