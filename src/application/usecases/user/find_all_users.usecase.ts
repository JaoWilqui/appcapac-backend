import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IFindAllUsersUsecase } from 'src/domain/usecases/user/ifind_all_users.usecase';

export class FindAllUsersUsecase implements IFindAllUsersUsecase {
  constructor(private userRepository: IUserRepository) {}
  async findAllUsers() {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar deletar o usuário!');
    }
  }
}
