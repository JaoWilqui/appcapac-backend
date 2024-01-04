import { CampaingEnum } from 'src/infrastructure/enum/campaning.enum';

export class ICreateCampaing {
  nome: string;

  descricao: string;

  dtinicio: Date;

  dtfim: Date;

  status: CampaingEnum;
}
