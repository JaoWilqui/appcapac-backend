import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateProductUsecase } from 'src/application/usecases/product/create_product.usecase';
import { DeleteProductUsecase } from 'src/application/usecases/product/delete_product.usecase';
import { FindAllProductUsecase } from 'src/application/usecases/product/find_all_products.usecase';
import { FindProductByIdUserUsecase } from 'src/application/usecases/product/find_product_by_id.usecase';
import { UpdateProductUsecase } from 'src/application/usecases/product/update_product.usecase';
import { IProduct } from 'src/domain/entities/product.entity';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { AuthGuard } from 'src/infrastructure/_http/guards/auth.guard';
import { ModulesGuard } from 'src/infrastructure/_http/guards/modules.guard';
import { PermsGuard } from 'src/infrastructure/_http/guards/perms.guard';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { CreateProductDTO } from 'src/infrastructure/dtos/product/create_product.dto';
import { GetProductDto } from 'src/infrastructure/dtos/product/get_product.dto';
import { UpdateProductDTO } from 'src/infrastructure/dtos/product/update_product.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';

@UseGuards(PermsGuard, AuthGuard, ModulesGuard)
@Controller('product')
export class ProductController {
  constructor(
    private createProductUsecase: CreateProductUsecase,
    private updateProductUsecase: UpdateProductUsecase,
    private deleteProductUsecase: DeleteProductUsecase,
    private findAllProductUsecase: FindAllProductUsecase,
    private findProductByIdProductUsecase: FindProductByIdUserUsecase,
  ) {}

  @Permissions(Perms.admin, Perms.user)
  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return await this.findProductByIdProductUsecase.findProductById(id);
  }

  @Permissions(Perms.admin, Perms.user)
  @Get('')
  async getAllProducts(@Query() params: PaginationDTO<GetProductDto> & IProduct) {
    return await this.findAllProductUsecase.findAllProduct(params);
  }

  @Permissions(Perms.admin)
  @Post('register')
  async registerProduct(@Body() createProductDTO: CreateProductDTO) {
    return await this.createProductUsecase.insertProduct(createProductDTO);
  }

  @Permissions(Perms.admin)
  @Put('update/:id')
  async updateProduct(@Body() updateProductDTO: UpdateProductDTO, @Param('id') id: number) {
    return await this.updateProductUsecase.updateProduct(id, updateProductDTO);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: number) {
    return await this.deleteProductUsecase.deleteProduct(id);
  }
}
