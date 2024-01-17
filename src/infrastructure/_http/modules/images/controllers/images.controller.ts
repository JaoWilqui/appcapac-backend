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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CreateImageUsecase } from 'src/application/usecases/images/create_image.usecase';
import { DeleteImageUsecase } from 'src/application/usecases/images/delete_image.usecase';
import { FindAllImagesUsecase } from 'src/application/usecases/images/find_all_images.usecase';
import { FindImagesByIdUserUsecase } from 'src/application/usecases/images/find_image_by_id.usecase';
import { UpdateImagesUsecase } from 'src/application/usecases/images/update_image.usecase';
import { IImages } from 'src/domain/entities/images.entity';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { Public } from 'src/infrastructure/_http/decorators/public.decorator';
import { AuthGuard } from 'src/infrastructure/_http/guards/auth.guard';
import { ModulesGuard } from 'src/infrastructure/_http/guards/modules.guard';
import { PermsGuard } from 'src/infrastructure/_http/guards/perms.guard';
import { CreateImagesDTO } from 'src/infrastructure/dtos/images/create_images.dto';
import { GetImagesDTO } from 'src/infrastructure/dtos/images/get_images.dto';
import { UpdateImagesDTO } from 'src/infrastructure/dtos/images/update_images.dto';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';
import fs = require('fs');
import path = require('path');
import multer = require('multer');
@UseGuards(PermsGuard, AuthGuard, ModulesGuard)
@Controller('images')
export class ImagesController {
  constructor(
    private createImageUsecase: CreateImageUsecase,
    private updateImagesUsecase: UpdateImagesUsecase,
    private deleteImageUsecase: DeleteImageUsecase,
    private findAllImagesUsecase: FindAllImagesUsecase,
    private findImagesByIdimageUsecase: FindImagesByIdUserUsecase,
  ) {}

  @Permissions(Perms.admin, Perms.user)
  @Get(':id')
  async getimageById(@Param('id') id: number) {
    const image = await this.findImagesByIdimageUsecase.findImagesById(id);

    image.imageRelativePath = process.env.APP_URL + '/images/view/' + image.imageRelativePath;

    return image;
  }

  @Permissions(Perms.admin, Perms.user)
  @Get('')
  async getAllimages(@Query() params: PaginationDTO<GetImagesDTO> & IImages) {
    let images = await this.findAllImagesUsecase.findAllImages(params);
    images = {
      ...images,
      data: images.data.map(img => ({
        ...img,
        imageRelativePath: process.env.APP_URL + '/images/view/' + img.imageRelativePath,
      })),
    };

    return images;
  }

  @Public()
  @Get('/view/:path')
  async getImage(@Param('path') path, @Res() res) {
    const file = fs.createReadStream(process.cwd() + '/uploads/images/' + path);
    res.setHeader('Content-Type', 'image/png');
    return file.pipe(res);
  }

  @Permissions(Perms.admin)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFiles(@UploadedFile() image: Express.Multer.File, @Req() req: Request) {
    const fileName = `${Date.now() + Math.random().toString(16).substr(8)}.${image.originalname
      .split('.')
      .pop()}`;

    const ws = fs.createWriteStream('./uploads/images/' + fileName);
    ws.write(image.buffer);

    const imageInfo: CreateImagesDTO = JSON.parse(req.body.imageInfo);
    const uploadImage: CreateImagesDTO = {
      nome: imageInfo.nome,
      operator: imageInfo.operator,
      category: imageInfo.category,
      adesao: imageInfo.adesao,
      uf: imageInfo.uf,
      campaing: imageInfo.campaing,
      descricao: imageInfo.descricao,
      imageRelativePath: fileName,
    };

    return await this.createImageUsecase.insertImages(uploadImage);
  }

  @Permissions(Perms.admin)
  @Put('upload/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateUpload(
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const registeredImg = await this.findImagesByIdimageUsecase.findImagesById(id);

    fs.unlinkSync('./uploads/images/' + registeredImg.imageRelativePath);

    const imageInfo: UpdateImagesDTO = JSON.parse(req.body.imageInfo);

    const fileName = `${Date.now() + Math.random().toString(16).substr(8)}.${image.originalname
      .split('.')
      .pop()}`;

    const ws = fs.createWriteStream('./uploads/images/' + fileName);
    ws.write(image.buffer);

    const uploadImage: UpdateImagesDTO = {
      id: id,
      operator: imageInfo.operator,
      adesao: imageInfo.adesao,
      uf: imageInfo.uf,
      nome: imageInfo.nome,
      category: imageInfo.category,
      campaing: imageInfo.campaing,
      descricao: imageInfo.descricao,
      imageRelativePath: fileName,
    };

    return await this.updateImagesUsecase.updateImages(id, uploadImage);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deleteimage(@Param('id') id: number) {
    return await this.deleteImageUsecase.deleteImages(id);
  }
}
