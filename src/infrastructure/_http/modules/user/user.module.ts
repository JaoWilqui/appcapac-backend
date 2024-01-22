import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUsecase } from 'src/application/usecases/user/create_user.usecase';
import { DeleteUserUsecase } from 'src/application/usecases/user/delete_user.usecase';
import { FindAllUsersUsecase } from 'src/application/usecases/user/find_all_users.usecase';
import { FindUserByIdUsecase } from 'src/application/usecases/user/find_user_by_id.usecase';
import { UpdateUserUsecase } from 'src/application/usecases/user/update_user.usecase';
import { IModulesRepository } from 'src/domain/repositories/modules.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBcryptService } from 'src/domain/services/bcrypt.service';
import { ModulesEntity } from 'src/infrastructure/entities/modules.entity';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { ModulesRepository } from 'src/infrastructure/repositories/modules.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { BcryptService } from 'src/infrastructure/services/bcrypt.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ModulesEntity])],
  controllers: [UserController],
  providers: [
    { provide: UserRepository, useClass: UserRepository },
    { provide: BcryptService, useClass: BcryptService },
    { provide: ModulesRepository, useClass: ModulesRepository },

    {
      provide: CreateUserUsecase,
      useFactory: (
        userRepository: IUserRepository,
        bcryptService: IBcryptService,
        modulesRepository: IModulesRepository,
      ) => new CreateUserUsecase(userRepository, bcryptService, modulesRepository),
      inject: [UserRepository, BcryptService, ModulesRepository],
    },
    {
      provide: UpdateUserUsecase,
      useFactory: (
        userRepository: IUserRepository,
        bcryptService: IBcryptService,
        modulesRepository: IModulesRepository,
      ) => new UpdateUserUsecase(userRepository, bcryptService, modulesRepository),
      inject: [UserRepository, BcryptService, ModulesRepository],
    },
    {
      provide: DeleteUserUsecase,
      useFactory: (userRepository: IUserRepository) => new DeleteUserUsecase(userRepository),
      inject: [UserRepository],
    },
    {
      provide: FindAllUsersUsecase,
      useFactory: (userRepository: IUserRepository) => new FindAllUsersUsecase(userRepository),
      inject: [UserRepository],
    },
    {
      provide: FindUserByIdUsecase,
      useFactory: (userRepository: IUserRepository) => new FindUserByIdUsecase(userRepository),
      inject: [UserRepository],
    },
  ],
})
export class UserModule {}
