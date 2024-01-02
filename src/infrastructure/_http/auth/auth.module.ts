import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUsecase } from 'src/application/usecases/auth.usecase';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IJwtService } from 'src/domain/services/jwt.service';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { JwtService } from 'src/infrastructure/services/jwt.service';

import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { BcryptService } from 'src/infrastructure/services/bcrypt.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1800000s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    { provide: UserRepository, useClass: UserRepository },
    { provide: JwtService, useClass: JwtService },
    { provide: BcryptService, useClass: BcryptService },
    {
      provide: AuthUsecase,
      useFactory: (userRepository: IUserRepository, jwtService: IJwtService, bcryptService: IBcryptService) => new AuthUsecase(userRepository, jwtService, bcryptService),
      inject: [UserRepository, JwtService, BcryptService],
    },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
