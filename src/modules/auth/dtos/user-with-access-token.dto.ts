import { User } from 'src/modules/user/user.entity';

export class UserWithAccessToken {
  accessToken: string;
  user: User;
}
