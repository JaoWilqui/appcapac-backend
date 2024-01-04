import { IsNotEmpty } from 'class-validator';
import { IUpdateCampaing } from 'src/domain/dto/campaing/update_campaing.dto';
import { CampaingEnum } from 'src/infrastructure/enum/campaning.enum';

export class UpdateCampaingDTO implements IUpdateCampaing {
  @IsNotEmpty({ message: 'O campo ID é obrigatório' })
  id: number;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  dtinicio: Date;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  dtfim: Date;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  status: CampaingEnum;
}
