import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateOperatorUsecase } from 'src/application/usecases/operators/create_operator.usecase';
import { DeleteOperatorUsecase } from 'src/application/usecases/operators/delete_operator.usecase';
import { FindAllOperatorUsecase } from 'src/application/usecases/operators/find_all_operators.usecase';
import { FindOperatorByIdUserUsecase } from 'src/application/usecases/operators/find_operator_by_id.usecase';
import { UpdateOperatorUsecase } from 'src/application/usecases/operators/update_operator.usecase';
import { IOperator } from 'src/domain/entities/operators.entity';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { ModulesGuard } from 'src/infrastructure/_http/guards/modules.guard';
import { PermsGuard } from 'src/infrastructure/_http/guards/perms.guard';
import { GetOperatorDTO } from 'src/infrastructure/dtos/operators/get_operator.dto';
import { UpdateOperatorDTO } from 'src/infrastructure/dtos/operators/update_operator.dto';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { CreateProductDTO } from 'src/infrastructure/dtos/product/create_product.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';
import { AuthGuard } from './../../../guards/auth.guard';

@UseGuards(PermsGuard, AuthGuard, ModulesGuard)
@Controller('operators')
export class OperatorsController {
  constructor(
    private createOperatorUsecase: CreateOperatorUsecase,
    private updateOperatorUsecase: UpdateOperatorUsecase,
    private deleteOperatorUsecase: DeleteOperatorUsecase,
    private findAllOperatorUsecase: FindAllOperatorUsecase,
    private findOperatorByIdOperatorUsecase: FindOperatorByIdUserUsecase,
  ) {}

  @Permissions(Perms.admin, Perms.user)
  @Get(':id')
  async getOperatorById(@Param('id') id: number) {
    return await this.findOperatorByIdOperatorUsecase.findOperatorById(id);
  }

  @Permissions(Perms.admin, Perms.user)
  @Get('')
  async getAllOperators(@Query() params: PaginationDTO<GetOperatorDTO> & IOperator) {
    return await this.findAllOperatorUsecase.findAllOperator(params);
  }

  @Permissions(Perms.admin)
  @Post('register')
  async registerOperator(@Body() createOperatorDTO: CreateProductDTO) {
    return await this.createOperatorUsecase.insertOperator(createOperatorDTO);
  }

  @Permissions(Perms.admin)
  @Put('update/:id')
  async updateOperator(@Body() updateOperatorDTO: UpdateOperatorDTO, @Param('id') id: number) {
    return await this.updateOperatorUsecase.updateOperator(id, updateOperatorDTO);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deleteOperator(@Param('id') id: number) {
    return await this.deleteOperatorUsecase.deleteOperator(id);
  }
}
