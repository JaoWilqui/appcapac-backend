import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class AuthUsecase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (user?.senha !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, username: user.nome };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
