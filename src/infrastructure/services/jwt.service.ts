import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwt } from '@nestjs/jwt';
import { IJwtService } from 'src/domain/services/jwt.service';
@Injectable()
export class JwtService implements IJwtService {
  constructor(
    private nestJwt: NestJwt,
    private configService: ConfigService,
  ) {}

  async sign(payload: any): Promise<string> {
    return await this.nestJwt.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
