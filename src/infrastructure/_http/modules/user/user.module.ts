import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUsecase } from 'src/application/usecases/user/create_user.usecase';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { BcryptService } from 'src/infrastructure/services/bcrypt.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    { provide: UserRepository, useClass: UserRepository },
    { provide: BcryptService, useClass: BcryptService },
    {
      provide: CreateUserUsecase,
      useFactory: (userRepository: IUserRepository, bcryptService: IBcryptService) => new CreateUserUsecase(userRepository, bcryptService),
      inject: [UserRepository, BcryptService],
    },
  ],
})
export class UserModule {}
