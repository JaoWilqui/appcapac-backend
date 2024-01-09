import { FilesRepository } from 'src/infrastructure/repositories/files.repository';
import { FilesController } from './controllers/files.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateFileUsecase } from 'src/application/usecases/files/create_file.usecase';
import { DeleteFileUsecase } from 'src/application/usecases/files/delete_file.usecase';
import { FindAllFileUsecase } from 'src/application/usecases/files/find_all_files.usecase';
import { FindFilesByIdUserUsecase } from 'src/application/usecases/files/find_file_by_id.usecase';
import { UpdateFilesUsecase } from 'src/application/usecases/files/update_file.usecase';
import { IFilesRepository } from 'src/domain/repositories/files.repository';
import { FilesEntity } from 'src/infrastructure/entities/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesEntity])],
  controllers: [FilesController],
  providers: [
    { provide: FilesRepository, useClass: FilesRepository },
    {
      provide: CreateFileUsecase,
      useFactory: (filesRepository: IFilesRepository) => new CreateFileUsecase(filesRepository),
      inject: [FilesRepository],
    },
    {
      provide: UpdateFilesUsecase,
      useFactory: (filesRepository: IFilesRepository) => new UpdateFilesUsecase(filesRepository),
      inject: [FilesRepository],
    },
    {
      provide: DeleteFileUsecase,
      useFactory: (filesRepository: IFilesRepository) => new DeleteFileUsecase(filesRepository),
      inject: [FilesRepository],
    },
    {
      provide: FindAllFileUsecase,
      useFactory: (filesRepository: IFilesRepository) => new FindAllFileUsecase(filesRepository),
      inject: [FilesRepository],
    },
    {
      provide: FindFilesByIdUserUsecase,
      useFactory: (filesRepository: IFilesRepository) =>
        new FindFilesByIdUserUsecase(filesRepository),
      inject: [FilesRepository],
    },
  ],
})
export class FilesModule {}
