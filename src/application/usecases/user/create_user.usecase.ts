import { AppError } from 'src/application/error';
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
    const existingCpfUser = await this.userRepository.findByCpf(user.cpf);

    const existingEmailUser = await this.userRepository.findByEmail(user.email);

    if (existingCpfUser) {
      throw new AppError('CPF já existente!', 400);
    }

    if (existingEmailUser) {
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
    interceptUser.senha = await this.bcryptService.encrypt(interceptUser.senha);
    await this.userRepository.insert(interceptUser);

    return { status: 200, message: 'Usuário registrado com sucesso!' };
  }
}
