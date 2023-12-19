import { IUser } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser>;
}
