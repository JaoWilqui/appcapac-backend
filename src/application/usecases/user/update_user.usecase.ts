import { IInsertUser } from 'src/domain/dto/user/insert_user.dto';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { IInsertUserUsecase } from 'src/domain/usecases/iinsert_user.usecase';

export class UpdateUserUsecase implements IInsertUserUsecase {
  constructor(
    private userRepository: IUserRepository,
    private bcryptService: IBcryptService,
  ) {}
  async insertUser(user: IInsertUser) {
    try {
      const interceptUser: IInsertUser = user;
      interceptUser.senha = await this.bcryptService.encrypt(interceptUser.senha);
      await this.userRepository.updateContent(interceptUser.id, interceptUser);
      return { status: 200, message: 'Usuário atualziado com sucesso!' };
    } catch (error) {
      throw Error();
    }
  }
}
