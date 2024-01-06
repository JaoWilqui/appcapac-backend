import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateCategoryUsecase } from 'src/application/usecases/category/create_category.usecase';
import { DeleteCategoryUsecase } from 'src/application/usecases/category/delete_category.usecase';
import { FindAllCategoryUsecase } from 'src/application/usecases/category/find_all_categorys.usecase';
import { FindCategoryByIdUserUsecase } from 'src/application/usecases/category/find_category_by_id.usecase';
import { UpdateCategoryUsecase } from 'src/application/usecases/category/update_category.usecase';
import { ICategory } from 'src/domain/entities/category.entity';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { AuthGuard } from 'src/infrastructure/_http/guards/auth.guard';
import { ModulesGuard } from 'src/infrastructure/_http/guards/modules.guard';
import { PermsGuard } from 'src/infrastructure/_http/guards/perms.guard';
import { CreateCateogryDTO } from 'src/infrastructure/dtos/category/create_category.dto';
import { GetCategoryDto } from 'src/infrastructure/dtos/category/get_category.dto';
import { UpdateCategoryDTO } from 'src/infrastructure/dtos/category/update_category.dto';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';

@UseGuards(PermsGuard, AuthGuard, ModulesGuard)
@Controller('category')
export class CategoryController {
  constructor(
    private createCategoryUsecase: CreateCategoryUsecase,
    private updateCategoryUsecase: UpdateCategoryUsecase,
    private deleteCategoryUsecase: DeleteCategoryUsecase,
    private findAllCategoryUsecase: FindAllCategoryUsecase,
    private findCategoryByIdCategoryUsecase: FindCategoryByIdUserUsecase,
  ) {}

  @Permissions(Perms.admin, Perms.user)
  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    return await this.findCategoryByIdCategoryUsecase.findCategoryById(id);
  }

  @Permissions(Perms.admin, Perms.user)
  @Get('')
  async getAllCategories(@Query() params: PaginationDTO<GetCategoryDto> & ICategory) {
    return await this.findAllCategoryUsecase.findAllCategory(params);
  }

  @Permissions(Perms.admin)
  @Post('register')
  async registerCategory(@Body() createCategoryDTO: CreateCateogryDTO) {
    return await this.createCategoryUsecase.insertCategory(createCategoryDTO);
  }

  @Permissions(Perms.admin)
  @Put('update/:id')
  async updateCategory(@Body() updateCategoryDTO: UpdateCategoryDTO, @Param('id') id: number) {
    return await this.updateCategoryUsecase.updateCategory(id, updateCategoryDTO);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deleteCategory(@Param('id') id: number) {
    return await this.deleteCategoryUsecase.deleteCategory(id);
  }
}
