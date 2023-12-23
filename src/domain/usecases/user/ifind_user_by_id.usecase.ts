import { IUser } from 'src/domain/entities/user.entity';

export interface IFindUserByIdUserUsecase {
  findUserById(id: number): Promise<IUser>;
}
