import { IUser } from 'src/domain/entities/user.entity';

export interface IFindAllUsersUsecase {
  findAllUsers(): Promise<IUser[]>;
}
