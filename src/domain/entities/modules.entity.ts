import { ModulesEnum } from 'src/infrastructure/enum/modules.enum';
import { IAccess } from './access.entity';
import { IFiles } from './files.entity';
import { IImages } from './images.entity';
import { IVideos } from './videos.entity';

export class IModules {
  id: number;

  nome: ModulesEnum;

  dtcadastros: Date;

  deletado: Date;

  arquivos: IFiles[];

  access: IAccess[];

  videos: IVideos[];

  images: IImages[];
}
