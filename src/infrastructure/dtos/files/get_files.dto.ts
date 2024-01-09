import { ICategory } from 'src/domain/entities/category.entity';
import { IFiles } from 'src/domain/entities/files.entity';

export class GetFilesDTO implements IFiles {
  id: number;

  fileRelativePath: string;

  tipo: string;

  nome: string;

  descricao: string;

  category: ICategory;

  deletado?: string;
  dtcadastro?: Date;
}
