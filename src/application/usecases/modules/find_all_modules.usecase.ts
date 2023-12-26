import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IUser } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IFindAllUsersUsecase } from 'src/domain/usecases/user/ifind_all_users.usecase';

export class FindAllUsersUsecase implements IFindAllUsersUsecase {
  constructor(private userRepository: IUserRepository) {}
  async findAllUsers(params: IPaginationDTO<IUser>) {
    try {
      const users = await this.userRepository.findAll(params);
      return users;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar os usuários!');
    }
  }
}
