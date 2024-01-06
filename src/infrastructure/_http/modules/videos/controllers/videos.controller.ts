import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateVideosUsecase } from 'src/application/usecases/videos/create_videos.usecase';
import { DeleteVideosUsecase } from 'src/application/usecases/videos/delete_videos.usecase';
import { FindAllVideosUsecase } from 'src/application/usecases/videos/find_all_videos.usecase';
import { FindVideosByIdUserUsecase } from 'src/application/usecases/videos/find_videos_by_id.usecase';
import { UpdateVideosUsecase } from 'src/application/usecases/videos/update_videos.usecase';
import { IVideos } from 'src/domain/entities/videos.entity';
import { Modules } from 'src/infrastructure/_http/decorators/modules.decorator';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { CreateVideoDTO } from 'src/infrastructure/dtos/videos/create_video.dto';
import { GetVideoDto } from 'src/infrastructure/dtos/videos/get_video.dto';
import { UpdateVideoDTO } from 'src/infrastructure/dtos/videos/update_video.dto';
import { ModulesEnum } from 'src/infrastructure/enum/modules.enum';
import { Perms } from 'src/infrastructure/enum/permissions.enum';

@Controller('videos')
export class VideosController {
  constructor(
    private createVideosUsecase: CreateVideosUsecase,
    private updateVideosUsecase: UpdateVideosUsecase,
    private deleteVideosUsecase: DeleteVideosUsecase,
    private findAllVideosUsecase: FindAllVideosUsecase,
    private findVideosByIdVideosUsecase: FindVideosByIdUserUsecase,
  ) {}

  @Permissions(Perms.admin, Perms.user)
  @Modules(ModulesEnum.videos)
  @Get(':id')
  async getVideosById(@Param('id') id: number) {
    return await this.findVideosByIdVideosUsecase.findVideosById(id);
  }

  @Permissions(Perms.admin, Perms.user)
  @Modules(ModulesEnum.videos)
  @Get('')
  async getAllVideos(@Query() params: PaginationDTO<GetVideoDto> & IVideos) {
    return await this.findAllVideosUsecase.findAllVideos(params);
  }

  @Permissions(Perms.admin, Perms.user)
  @Modules(ModulesEnum.videos)
  @Post('register')
  async registerVideos(@Body() createVideoDTO: CreateVideoDTO) {
    return await this.createVideosUsecase.insertVideo(createVideoDTO);
  }

  @Permissions(Perms.admin, Perms.user)
  @Modules(ModulesEnum.videos)
  @Put('update/:id')
  async updateVideos(@Body() updateVideoDTO: UpdateVideoDTO, @Param('id') id: number) {
    return await this.updateVideosUsecase.updateVideos(id, updateVideoDTO);
  }

  @Permissions(Perms.admin, Perms.user)
  @Modules(ModulesEnum.videos)
  @Delete('delete/:id')
  async deleteVideos(@Param('id') id: number) {
    return await this.deleteVideosUsecase.deleteVideo(id);
  }
}
