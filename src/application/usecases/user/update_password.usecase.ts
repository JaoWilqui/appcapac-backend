import { AppError } from 'src/application/error';
import {} from 'src/domain/dto/user/create_user.dto';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { IUpdatePasswordUsecase } from 'src/domain/usecases/user/iupdate_password.usecase';

export class UpdatePasswordUsecase implements IUpdatePasswordUsecase {
  constructor(
    private userRepository: IUserRepository,
    private bcryptService: IBcryptService,
  ) {}
  async updatePassword(id: number, newPassword: string, confirmPassword: string) {
    if (newPassword != confirmPassword) {
      throw new AppError('As senhas não são iguais!', 401);
    }

    const encryptedPassword = await this.bcryptService.encrypt(newPassword);

    await this.userRepository.updatePassword(id, encryptedPassword);

    return { status: 200, message: 'Senha atualizada com sucesso!' };
  }
}
