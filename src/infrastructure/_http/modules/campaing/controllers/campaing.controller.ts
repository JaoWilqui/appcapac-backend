/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCampaingUsecase } from 'src/application/usecases/campaing/create_campaing.usecase';
import { DeleteCampaingUsecase } from 'src/application/usecases/campaing/delete_campaing.usecase';
import { FindAllCampaingUsecase } from 'src/application/usecases/campaing/find_all_campaings.usecase';
import { FindCampaingByIdUserUsecase } from 'src/application/usecases/campaing/find_campaing_by_id.usecase';
import { UpdateCampaingUsecase } from 'src/application/usecases/campaing/update_campaing.usecase';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { CreateCampaingDTO } from 'src/infrastructure/dtos/campaing/create_campaing.dto';
import { GetCampaingDto } from 'src/infrastructure/dtos/campaing/get_campaing.dto';
import { UpdateCampaingDTO } from 'src/infrastructure/dtos/campaing/update_campaing.dto';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';

@Controller('campaing')
export class CampaingController {
  constructor(
    private createCampaingUsecase: CreateCampaingUsecase,
    private updateCampaingUsecase: UpdateCampaingUsecase,
    private deleteCampaingUsecase: DeleteCampaingUsecase,
    private findAllCampaingUsecase: FindAllCampaingUsecase,
    private findCampaingByIUsecase: FindCampaingByIdUserUsecase,
  ) {}

  @Permissions(Perms.admin, Perms.user)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.findCampaingByIUsecase.findCampaingById(id);
  }

  @Permissions(Perms.admin, Perms.user)
  @Get('')
  async getAllUsers(@Query() params: PaginationDTO<GetCampaingDto> & ICampaing) {
    return await this.findAllCampaingUsecase.findAllCampaing(params);
  }

  @Permissions(Perms.admin)
  @Post('register')
  async registerUser(@Body() createCampaingDTO: CreateCampaingDTO) {
    return await this.createCampaingUsecase.insertCampaing(createCampaingDTO);
  }

  @Permissions(Perms.admin)
  @Put('update/:id')
  async updateUser(@Body() updateCampaingDTO: UpdateCampaingDTO, @Param('id') id: number) {
    return await this.updateCampaingUsecase.updateCampaing(id, updateCampaingDTO);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.deleteCampaingUsecase.deleteCampaing(id);
  }
}
