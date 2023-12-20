import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IJwtService } from 'src/domain/services/jwt.service';
import { IAuthUseCase } from 'src/domain/usecases/iauth.usecase';
import { BcryptService } from 'src/infrastructure/services/bcrypt.service';

export class AuthUsecase implements IAuthUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJwtService,
    private bcryptService: BcryptService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    const isMatch = this.bcryptService.compare(password, user.senha);

    if (!isMatch) {
      throw new Error('Erro ao autenticar, verifique seus dados');
    }

    const payload = { sub: user.id, email: user.email, username: user.nome, perm: user.perms };
    return {
      access_token: await this.jwtService.sign(payload),
      user,
    };
  }
}
