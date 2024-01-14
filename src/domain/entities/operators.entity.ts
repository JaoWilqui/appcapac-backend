import { IFiles } from './files.entity';
import { IImages } from './images.entity';

export class IOperator {
  id?: number;

  nome: string;

  dtcadastro?: Date;

  deletado?: Date;

  images?: IImages[];

  files?: IFiles[];
}
