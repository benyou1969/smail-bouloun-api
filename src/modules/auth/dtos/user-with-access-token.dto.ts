import { User } from 'modules/user/user.entity';

export class UserWithAccessToken {
  accessToken: string;
  user: User;
}
