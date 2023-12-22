import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { InsertUserDTO } from 'src/infrastructure/dtos/user/insert_user.dto';
import { CreateUserUsecase } from './../../../../../application/usecases/user/create_user.usecase';
import { UpdateUserUsecase } from './../../../../../application/usecases/user/update_user.usecase';

@Controller('user')
export class UserController {
  constructor(
    private createUserUsecase: CreateUserUsecase,
    private updateUserUsecase: UpdateUserUsecase,
  ) {}

  @Post('register')
  async registerUser(@Body() inserUserDTO: InsertUserDTO) {
    return await this.createUserUsecase.insertUser(inserUserDTO);
  }

  @Put('update/:id')
  async updateUser(@Body() inserUserDTO: InsertUserDTO, @Param('id') id: number) {
    inserUserDTO.id = id;
    return await this.updateUserUsecase.insertUser(inserUserDTO);
  }
}
