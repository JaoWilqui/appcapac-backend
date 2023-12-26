import {} from 'src/domain/dto/user/create_user.dto';
import { IUpdateUser } from 'src/domain/dto/user/update_user.dto';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { IUpdateUserUsecase } from 'src/domain/usecases/user/iupdate_user.usecase';

export class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(
    private userRepository: IUserRepository,
    private bcryptService: IBcryptService,
  ) {}
  async updateUser(id: number, user: IUpdateUser) {
    try {
      const interceptUser: IUpdateUser = user;
      interceptUser.senha = await this.bcryptService.encrypt(interceptUser.senha);
      await this.userRepository.updateContent(id, interceptUser);
      return { status: 200, message: 'Usuário atualziado com sucesso!' };
    } catch (error) {
      throw Error();
    }
  }
}
