import { ILogin } from 'src/domain/dto/auth/auth.dto';
import { IUserProfile } from 'src/domain/dto/user/user_profile.dto';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { IJwtService } from 'src/domain/services/jwt.service';
import { IAuthUseCase } from 'src/domain/usecases/iauth.usecase';
import { AppError } from '../error';

export class AuthUsecase implements IAuthUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJwtService,
    private bcryptService: IBcryptService,
  ) {}

  async signIn(login: ILogin) {
    const user = await this.userRepository.findByCpf(login.cpf);

    if (!user) throw new AppError('Usuário ou senha incorretos', 401);

    const isMatch = await this.bcryptService.compare(login.password, user.senha);

    if (!isMatch) {
      throw new AppError('Usuário ou senha incorretos', 401);
    }

    const payload: IUserProfile = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      sobrenome: user.sobrenome,
      perms: user.perms,
      dtcadastro: user.dtcadastro,
      cpf: user.cpf,
      modules: user.modules,
    };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
