import { IUpdateUser } from '../../dto/user/update_user.dto';

export interface IUpdateUserUsecase {
  updateUser(id: number, user: IUpdateUser): Promise<any>;
}
