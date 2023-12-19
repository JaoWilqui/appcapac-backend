import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService as NestJwt } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUsecase } from 'src/application/usecases/auth.usecase';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IJwtService } from 'src/domain/services/jwt.service';
import { AuthGuard } from 'src/infrastructure/_http/guards/auth.guard';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { JwtService } from 'src/infrastructure/services/jwt.service';
import { PermsGuard } from '../guards/perms.guard';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '18000s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    { provide: UserRepository, useClass: UserRepository },

    {
      provide: AuthUsecase,
      useFactory: (userRepository: IUserRepository, jwtService: IJwtService) => new AuthUsecase(userRepository, jwtService),
      inject: [UserRepository, JwtService],
    },

    { provide: JwtService, useFactory: (nestJwt: NestJwt, configService: ConfigService) => new JwtService(nestJwt, configService), inject: [NestJwt, ConfigService] },

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermsGuard,
    },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
