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
    const existingCpfUser = await this.userRepository.findByCpf(user.cpf);

    const existingEmailUser = await this.userRepository.findByEmail(user.email);

    if (existingCpfUser && existingCpfUser.id != id) {
      throw new AppError('CPF já existente!', 400);
    }

    if (existingEmailUser && existingEmailUser.id != id) {
      throw new AppError('E-mail já existente!', 400);
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
      interceptUser.senha = existingCpfUser.senha;
    }

    if (user.perms) {
      interceptUser.perms = user.perms;
    } else {
      interceptUser.perms = existingCpfUser.perms;
    }

    await this.userRepository.updateContent(id, interceptUser);

    return { status: 200, message: 'Usuário atualizado com sucesso!' };
  }
}
