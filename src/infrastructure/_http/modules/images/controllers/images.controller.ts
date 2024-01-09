/*
https://docs.nestjs.com/controllers#controllers
*/

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
import { Request, Response } from 'express';
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
    image.imageRelativePath =
      process.env.APP_URL + `/images/view/${image.imageRelativePath.toString()}`;
    return image;
  }

  @Permissions(Perms.admin, Perms.user)
  @Get('')
  async getAllimages(@Query() params: PaginationDTO<GetImagesDTO> & IImages) {
    const images = await this.findAllImagesUsecase.findAllImages(params);
    images.data.forEach(image => {
      image.imageRelativePath =
        process.env.APP_URL + `/images/view/${image.imageRelativePath.toString()}`;
    });

    return images;
  }
  @Permissions(Perms.admin)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      storage: multer.diskStorage({
        destination: './uploads/images',
        filename: function (req, file, callback) {
          console.log(file, req);
          callback(null, file.originalname + '');
        },
      }),
    }),
  )
  async uploadFiles(@UploadedFiles() image: Express.Multer.File, @Req() req: Request) {
    const imageInfo: CreateImagesDTO = JSON.parse(req.body.imageInfo);
    const uploadImage: CreateImagesDTO = {
      nome: imageInfo.nome,
      category: imageInfo.category,
      campaing: imageInfo.campaing,
      descricao: imageInfo.descricao,
      imageRelativePath: image[0].originalname,
    };

    await this.createImageUsecase.insertImages(uploadImage);
  }

  @Public()
  @Get('view/:path')
  async getImagePath(@Param('path') path: string, @Res() res: Response) {
    const imageBuffer = fs.createReadStream(process.cwd() + `/uploads/images/${path}`);
    res.set({ 'Content-Type': 'image/png' });
    return imageBuffer.pipe(res);
  }

  @Permissions(Perms.admin)
  @Put('upload/:id')
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      storage: multer.diskStorage({
        destination: './uploads/images',
        filename: function (req, file, callback) {
          console.log(file, req);
          callback(null, file.originalname + '');
        },
      }),
    }),
  )
  async updateimage(
    @UploadedFiles() image: Express.Multer.File,
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const imageInfo: UpdateImagesDTO = JSON.parse(req.body.imageInfo);

    const imagePathToDelete = (await this.findImagesByIdimageUsecase.findImagesById(id))
      .imageRelativePath;

    if (imageInfo.imageRelativePath != imagePathToDelete) {
      fs.unlinkSync(process.cwd() + '/uploads/images/' + imagePathToDelete);
    }

    const uploadImage: UpdateImagesDTO = {
      id: id,
      nome: imageInfo.nome,
      category: imageInfo.category,
      campaing: imageInfo.campaing,
      descricao: imageInfo.descricao,
      imageRelativePath: image[0].originalname,
    };

    return await this.updateImagesUsecase.updateImages(id, uploadImage);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deleteimage(@Param('id') id: number) {
    return await this.deleteImageUsecase.deleteImages(id);
  }
}
