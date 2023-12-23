import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IFindUserByIdUserUsecase } from 'src/domain/usecases/user/ifind_user_by_id.usecase';

export class FindUserByIdUsecase implements IFindUserByIdUserUsecase {
  constructor(private userRepository: IUserRepository) {}
  async findUserById(id: number) {
    try {
      const user = await this.userRepository.findById(id);
      return user;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar o usuário!');
    }
  }
}
