import { ILogin } from 'src/domain/dto/auth/auth.dto';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { IJwtService } from 'src/domain/services/jwt.service';
import { IAuthUseCase } from 'src/domain/usecases/iauth.usecase';

export class AuthUsecase implements IAuthUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJwtService,
    private bcryptService: IBcryptService,
  ) {}

  async signIn(login: ILogin) {
    const user = await this.userRepository.findByEmail(login.email);

    const isMatch = this.bcryptService.compare(login.password, user.senha);

    if (!isMatch) {
      throw new Error('Erro ao autenticar, verifique seus dados');
    }

    const payload = { sub: user.id, email: user.email, username: user.nome, perm: user.perms };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
