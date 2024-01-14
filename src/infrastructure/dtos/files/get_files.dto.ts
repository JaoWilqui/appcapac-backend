import { ICategory } from 'src/domain/entities/category.entity';
import { IFiles } from 'src/domain/entities/files.entity';
import { IOperator } from 'src/domain/entities/operators.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class GetFilesDTO implements IFiles {
  deletado?: Date;
  id: number;

  fileRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  tipo: string;

  nome: string;

  descricao: string;

  operator: IOperator;

  category: ICategory;

  dtcadastro?: Date;
}
