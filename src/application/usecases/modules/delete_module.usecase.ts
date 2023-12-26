import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IDeleteUserUsecase } from 'src/domain/usecases/user/idelete_user.usecase';

export class DeleteUserUsecase implements IDeleteUserUsecase {
  constructor(private userRepository: IUserRepository) {}
  async deleteUser(id: number) {
    try {
      await this.userRepository.deleteById(id);
      return { status: 200, message: 'Usuário deletado com sucesso!' };
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar deletar o usuário!');
    }
  }
}
