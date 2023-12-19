import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IJwtService } from 'src/domain/services/jwt.service';
import { IAuthUseCase } from 'src/domain/usecases/iauth.usecase';

export class AuthUsecase implements IAuthUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user?.senha !== password) {
      throw new Error('Erro ao autenticar, verifique seus dados');
    }
    const payload = { sub: user.id, email: user.email, username: user.nome, perm: user.perms };
    return {
      access_token: await this.jwtService.sign(payload),
      user,
    };
  }
}
