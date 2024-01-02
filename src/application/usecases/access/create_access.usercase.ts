import { ICreatetUser } from 'src/domain/dto/user/create_user.dto';
import { IAccesRepository } from 'src/domain/repositories/access.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { ICreateUserUsecase } from 'src/domain/usecases/user/icreate_user.usecase';

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private userRepository: IUserRepository,
    private accessRepository: IAccesRepository,
    private bcryptService: IBcryptService,
  ) {}

  async insertUser(user: ICreatetUser) {
    try {
      const interceptUser: ICreatetUser = user;
      interceptUser.senha = await this.bcryptService.encrypt(interceptUser.senha);
      await this.userRepository.insert(interceptUser);

      return { status: 200, message: 'Usuário registrado com sucesso!' };
    } catch (error) {
      throw Error();
    }
  }
}
