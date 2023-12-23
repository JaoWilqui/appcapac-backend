import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeleteUserUsecase } from 'src/application/usecases/user/delete_user.usecase';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { PermsGuard } from 'src/infrastructure/_http/guards/perms.guard';
import { CreateUserDTO } from 'src/infrastructure/dtos/user/create_user.dto';
import { UpdateUserDTO } from 'src/infrastructure/dtos/user/update_user.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';
import { CreateUserUsecase } from './../../../../../application/usecases/user/create_user.usecase';
import { UpdateUserUsecase } from './../../../../../application/usecases/user/update_user.usecase';

@Controller('user')
@UseGuards(PermsGuard)
export class UserController {
  constructor(
    private createUserUsecase: CreateUserUsecase,
    private updateUserUsecase: UpdateUserUsecase,
    private deleteUserUsecase: DeleteUserUsecase,
  ) {}

  @Post('register')
  @Permissions([Perms.admin])
  async registerUser(@Body() CreateUserDTO: CreateUserDTO) {
    return await this.createUserUsecase.insertUser(CreateUserDTO);
  }

  @Put('update/:id')
  @Permissions([Perms.admin])
  async updateUser(@Body() updateUserDTO: UpdateUserDTO, @Param('id') id: number) {
    return await this.updateUserUsecase.updateUser(id, updateUserDTO);
  }

  @Delete('delete/:id')
  @Permissions([Perms.admin])
  async deleteUser(@Param('id') id: number) {
    return await this.deleteUserUsecase.deleteUser(id);
  }
}
