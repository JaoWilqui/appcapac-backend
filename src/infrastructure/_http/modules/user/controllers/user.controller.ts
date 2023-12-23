import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeleteUserUsecase } from 'src/application/usecases/user/delete_user.usecase';
import { FindAllUsersUsecase } from 'src/application/usecases/user/find_all_users.usecase';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { PermsGuard } from 'src/infrastructure/_http/guards/perms.guard';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { CreateUserDTO } from 'src/infrastructure/dtos/user/create_user.dto';
import { GetUserDto } from 'src/infrastructure/dtos/user/get_user.dto';
import { UpdateUserDTO } from 'src/infrastructure/dtos/user/update_user.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';
import { CreateUserUsecase } from './../../../../../application/usecases/user/create_user.usecase';
import { FindUserByIdUsecase } from './../../../../../application/usecases/user/find_user_by_id.usecase';
import { UpdateUserUsecase } from './../../../../../application/usecases/user/update_user.usecase';

@Controller('user')
@UseGuards(PermsGuard)
export class UserController {
  constructor(
    private createUserUsecase: CreateUserUsecase,
    private updateUserUsecase: UpdateUserUsecase,
    private deleteUserUsecase: DeleteUserUsecase,
    private findAllUsersUsecase: FindAllUsersUsecase,
    private findUserByIdUsecase: FindUserByIdUsecase,
  ) {}

  @Get(':id')
  @Permissions([Perms.admin])
  async getUserById(@Param('id') id: number) {
    return await this.findUserByIdUsecase.findUserById(id);
  }

  @Get('')
  @Permissions([Perms.admin])
  async getAllUsers(@Body() params: PaginationDTO<GetUserDto>) {
    return await this.findAllUsersUsecase.findAllUsers(params);
  }

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
