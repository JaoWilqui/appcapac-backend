import { BadRequestException, ConflictException, HttpStatus } from '@nestjs/common';
import { ICreatetUser } from 'src/domain/dto/user/create_user.dto';
import { IModules } from 'src/domain/entities/modules.entity';
import { IUser } from 'src/domain/entities/user.entity';
import { IModulesRepository } from 'src/domain/repositories/modules.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { ICreateUserUsecase } from 'src/domain/usecases/user/icreate_user.usecase';

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private userRepository: IUserRepository,
    private bcryptService: IBcryptService,
    private modulesRepository: IModulesRepository,
  ) {}

  async insertUser(user: ICreatetUser) {
    try {
      const existingEmail = await this.userRepository.findByEmail(user.email);

      if (existingEmail) {
        throw new ConflictException();
      }

      const interceptUser: IUser = { ...user, modules: [] };

      const filteredModules: IModules[] = [];
      const modules = await this.modulesRepository.findAll();
      modules.data.forEach(module => {
        user.modules.forEach(value => {
          if (module.id == value) {
            filteredModules.push(module);
          }
        });
      });
      interceptUser.modules = filteredModules;
      interceptUser.senha = await this.bcryptService.encrypt(interceptUser.senha);
      await this.userRepository.insert(interceptUser);

      return { status: 200, message: 'Usuário registrado com sucesso!' };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          message: 'E-mail ja existente!',
        });
      }
      throw new BadRequestException(error);
    }
  }
}
