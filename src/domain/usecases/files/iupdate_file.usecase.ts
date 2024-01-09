import { IUpdateFiles } from 'src/domain/dto/files/update_file.dto';

export interface IUpdateFilesUsecase {
  updateFile(id: number, images: IUpdateFiles): Promise<any>;
}
