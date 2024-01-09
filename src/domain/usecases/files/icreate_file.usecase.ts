import { ICreateFiles } from 'src/domain/dto/files/create_file.dto';

export interface ICreateFileUsecase {
  insertFile(images: ICreateFiles): Promise<any>;
}
