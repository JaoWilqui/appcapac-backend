import { AppError } from 'src/application/error';
import {} from 'src/domain/dto/user/create_user.dto';
import { IUpdateUser } from 'src/domain/dto/user/update_user.dto';
import { IModules } from 'src/domain/entities/modules.entity';
import { IUser } from 'src/domain/entities/user.entity';
import { IModulesRepository } from 'src/domain/repositories/modules.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { IUpdateUserUsecase } from 'src/domain/usecases/user/iupdate_user.usecase';

export class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(
    private userRepository: IUserRepository,
    private bcryptService: IBcryptService,
    private modulesRepository: IModulesRepository,
  ) {}
  async updateUser(id: number, user: IUpdateUser) {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser && id != existingUser.id) {
      throw new AppError('Email já existente!', 401);
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
    if (user.senha) {
      interceptUser.senha = await this.bcryptService.encrypt(interceptUser.senha);
    } else {
      interceptUser.senha = existingUser.senha;
    }

    await this.userRepository.updateContent(id, interceptUser);
    return { status: 200, message: 'Usuário atualziado com sucesso!' };
  }
}
