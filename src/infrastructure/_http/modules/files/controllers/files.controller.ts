import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import path = require('path');
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

    return file;
  }

  @Permissions(Perms.admin, Perms.user)
  @Get('')
  async getAllfiles(@Query() params: PaginationDTO<GetFilesDTO> & IFiles) {
    let files = await this.findAllFileUsecase.findAllFile(params);

    return files;
  }

  @Public()
  @Get('/download/:path')
  async getImage(@Param('path') path) {
    const file = fs.createReadStream(process.cwd() + '/uploads/files/' + path);
    return new StreamableFile(file);
  }

  @Permissions(Perms.admin)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10485760 } }))
  @Post('upload')
  async uploadFiles(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const fileName = `${Date.now() + Math.random().toString(16).substr(8)}.${file.originalname
      .split('.')
      .pop()}`;

    const ws = fs.createWriteStream('./uploads/files/' + fileName);
    ws.write(file.buffer);

    const fileInfo: CreateFileDTO = JSON.parse(req.body.fileInfo);
    const uploadFile: CreateFileDTO = {
      operator: fileInfo.operator,
      nome: fileInfo.nome,
      product: fileInfo.product,
      tipo: fileInfo.tipo,
      cidade: fileInfo.cidade,

      adesao: fileInfo.adesao,
      uf: fileInfo.uf,
      descricao: fileInfo.descricao,
      fileRelativePath: fileName,
    };
    return await this.createFileUsecase.insertFile(uploadFile);
  }

  @Permissions(Perms.admin)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10485760 } }))
  @Put('upload/:id')
  async updateUpload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const registeredFile = await this.findFileByIdUserUsecase.findFileById(id);

    fs.unlinkSync('./uploads/files/' + registeredFile.fileRelativePath);

    const fileInfo: UpdateFileDTO = JSON.parse(req.body.fileInfo);

    const fileName = `${Date.now() + Math.random().toString(16).substr(8)}.${file.originalname
      .split('.')
      .pop()}`;

    const ws = fs.createWriteStream('./uploads/files/' + fileName);
    ws.write(file.buffer);

    const uploadFile: UpdateFileDTO = {
      id: id,
      operator: fileInfo.operator,
      nome: fileInfo.nome,
      adesao: fileInfo.adesao,
      cidade: fileInfo.cidade,

      uf: fileInfo.uf,
      tipo: fileInfo.tipo,
      product: fileInfo.product,
      descricao: fileInfo.descricao,
      fileRelativePath: fileName,
    };

    return await this.updateFilesUsecase.updateFile(id, uploadFile);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deletefile(@Param('id') id: number) {
    return await this.deleteFileUsecase.deleteFile(id);
  }
}
