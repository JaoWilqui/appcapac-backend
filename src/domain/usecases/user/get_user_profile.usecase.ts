import { IUserProfile } from 'src/domain/dto/user/user_profile.dto';

export interface IGetUserProfileUsecase {
  getProfile(id: number): Promise<IUserProfile>;
}
