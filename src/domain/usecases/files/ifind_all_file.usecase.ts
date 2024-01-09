import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IFiles } from 'src/domain/entities/files.entity';

export interface IFindAllFileUsecase {
  findAllFile(params: IPaginationDTO<IFiles>): Promise<IPaginationDTO<IFiles>>;
}
