import { config } from 'dotenv';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/user/user.repository';
import { JwtPayload } from '../dtos';
import { User } from 'src/modules/user/user.entity';

config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TopSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email, tokenVersion } = payload;
    const user = await this.userRepository.findOne({ email });
    if (!user || user.tokenVersion !== tokenVersion) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
