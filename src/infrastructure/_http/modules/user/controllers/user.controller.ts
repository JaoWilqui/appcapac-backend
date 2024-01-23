import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DeleteUserUsecase } from 'src/application/usecases/user/delete_user.usecase';
import { FindAllUsersUsecase } from 'src/application/usecases/user/find_all_users.usecase';
import { UpdatePasswordUsecase } from 'src/application/usecases/user/update_password.usecase';
import { IUserProfile } from 'src/domain/dto/user/user_profile.dto';
import { IUser } from 'src/domain/entities/user.entity';
import { Permissions } from 'src/infrastructure/_http/decorators/perms.decorator';
import { User } from 'src/infrastructure/_http/decorators/user.decorator';
import { AuthGuard } from 'src/infrastructure/_http/guards/auth.guard';
import { ModulesGuard } from 'src/infrastructure/_http/guards/modules.guard';
import { PermsGuard } from 'src/infrastructure/_http/guards/perms.guard';
import { PaginationDTO } from 'src/infrastructure/dtos/pagination.dto';
import { CreateUserDTO } from 'src/infrastructure/dtos/user/create_user.dto';
import { GetUserDto } from 'src/infrastructure/dtos/user/get_user.dto';
import { UpdateUserDTO } from 'src/infrastructure/dtos/user/update_user.dto';
import { Perms } from 'src/infrastructure/enum/permissions.enum';
import { CreateUserUsecase } from './../../../../../application/usecases/user/create_user.usecase';
import { FindUserByIdUsecase } from './../../../../../application/usecases/user/find_user_by_id.usecase';
import { UpdateUserUsecase } from './../../../../../application/usecases/user/update_user.usecase';

@UseGuards(PermsGuard, AuthGuard, ModulesGuard)
@Controller('user')
export class UserController {
  constructor(
    private createUserUsecase: CreateUserUsecase,
    private updateUserUsecase: UpdateUserUsecase,
    private deleteUserUsecase: DeleteUserUsecase,
    private findAllUsersUsecase: FindAllUsersUsecase,
    private findUserByIdUsecase: FindUserByIdUsecase,
    private updatePasswordUsecase: UpdatePasswordUsecase,
  ) {}

  @Get('profile')
  async getProfile(@User() user) {
    let userProfile: IUserProfile;
    const registeredUser = await this.findUserByIdUsecase.findUserById(user.id);
    userProfile = {
      id: registeredUser.id,
      dtcadastro: registeredUser.dtcadastro,
      ...registeredUser,
    };
    return userProfile;
  }

  @Permissions(Perms.admin, Perms.user)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.findUserByIdUsecase.findUserById(id);
  }

  @Permissions(Perms.admin)
  @Get('')
  async getAllUsers(@Query() params: PaginationDTO<GetUserDto> & IUser) {
    return await this.findAllUsersUsecase.findAllUsers(params);
  }

  @Permissions(Perms.admin)
  @Post('register')
  async registerUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.createUserUsecase.insertUser(createUserDTO);
  }

  @Permissions(Perms.admin, Perms.user)
  @Put('change-password/:id')
  async updatePassword(
    @Param('id') id: number,
    @Body() changePasswordDTO: { newPassword: string; confirmPassword: string },
  ) {
    return await this.updatePasswordUsecase.updatePassword(
      id,
      changePasswordDTO.newPassword,
      changePasswordDTO.confirmPassword,
    );
  }

  @Permissions(Perms.admin)
  @Put('update/:id')
  async updateUser(@Body() updateUserDTO: UpdateUserDTO, @Param('id') id: number) {
    return await this.updateUserUsecase.updateUser(id, updateUserDTO);
  }

  @Permissions(Perms.admin)
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.deleteUserUsecase.deleteUser(id);
  }
}
