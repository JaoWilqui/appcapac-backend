import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateFileUsecase } from 'src/application/usecases/files/create_file.usecase';
import { DeleteFileUsecase } from 'src/application/usecases/files/delete_file.usecase';
import { FindAllFileUsecase } from 'src/application/usecases/files/find_all_files.usecase';
import { FindFilesByIdUserUsecase } from 'src/application/usecases/files/find_file_by_id.usecase';
import { UpdateFilesUsecase } from 'src/application/usecases/files/update_file.usecase';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { Public } from 'src/infrastructure/_http/decorators/public.decorator';
import { AuthGuard } from 'src/infrastructure/_http/guards/auth.guard';
import { ModulesGuard } from 'src/infrastructure/_http/guards/modules.guard';
import { PermsGuard } from 'src/infrastructure/_http/guards/perms.guard';

import { Request } from 'express';
import { IFiles } from 'src/domain/entities/files.entity';
import { CreateFileDTO } from 'src/infrastructure/dtos/files/create_file.dto';
import { GetFilesDTO } from 'src/infrastructure/dtos/files/get_files.dto';
import { UpdateFileDTO } from 'src/infrastructure/dtos/files/update_file.dto';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';
import fs = require('fs');
import multer = require('multer');
@UseGuards(PermsGuard, AuthGuard, ModulesGuard)
@Controller('files')
export class FilesController {
  constructor(
    private createFileUsecase: CreateFileUsecase,
    private updateFilesUsecase: UpdateFilesUsecase,
    private deleteFileUsecase: DeleteFileUsecase,
    private findAllFileUsecase: FindAllFileUsecase,
    private findFileByIdUserUsecase: FindFilesByIdUserUsecase,
  ) {}

  @Permissions(Perms.admin, Perms.user)
  @Get(':id')
  async getfileById(@Param('id') id: number) {
    const file = await this.findFileByIdUserUsecase.findFileById(id);

    file.fileRelativePath = process.env.APP_URL + '/files/view/' + file.fileRelativePath;

    return file;
  }

  @Permissions(Perms.admin, Perms.user)
  @Get('')
  async getAllfiles(@Query() params: PaginationDTO<GetFilesDTO> & IFiles) {
    let files = await this.findAllFileUsecase.findAllFile(params);
    files = {
      ...files,
      data: files.data.map(file => ({
        ...file,
        fileRelativePath: process.env.APP_URL + '/files/view/' + file.fileRelativePath,
      })),
    };

    return files;
  }

  @Public()
  @Get('/view/:path')
  async getImage(@Param('path') path, @Res() res) {
    const file = fs.createReadStream(process.cwd() + '/uploads/files/' + path);
    res.setHeader('Content-Type', 'file/png');
    return file.pipe(res);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      storage: multer.diskStorage({
        destination: './uploads/files',
        filename: function (req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFiles(@UploadedFiles() file: Express.Multer.File, @Req() req: Request) {
    const fileInfo: CreateFileDTO = JSON.parse(req.body.fileInfo);
    const uploadFile: CreateFileDTO = {
      nome: fileInfo.nome,
      category: fileInfo.category,
      tipo: fileInfo.tipo,
      descricao: fileInfo.descricao,
      fileRelativePath: file[0].originalname,
    };

    return await this.createFileUsecase.insertFile(uploadFile);
  }

  @Put('upload/:id')
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: multer.diskStorage({
        destination: './uploads/files',
        filename: function (req, file, callback) {
          console.log(file, req);
          callback(null, file.originalname + '');
        },
      }),
    }),
  )
  async updateUpload(
    @UploadedFiles() file: Express.Multer.File,
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const registeredImage = await this.findFileByIdUserUsecase.findFileById(id);

    fs.unlinkSync(process.cwd() + `/uploads/files/${registeredImage.fileRelativePath.toString()}`);

    const fileInfo: UpdateFileDTO = JSON.parse(req.body.fileInfo);
    const uploadFile: UpdateFileDTO = {
      id: id,
      nome: fileInfo.nome,
      tipo: fileInfo.tipo,
      category: fileInfo.category,
      descricao: fileInfo.descricao,
      fileRelativePath: file[0].originalname,
    };

    return await this.updateFilesUsecase.updateFile(id, uploadFile);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deletefile(@Param('id') id: number) {
    return await this.deleteFileUsecase.deleteFile(id);
  }
}
