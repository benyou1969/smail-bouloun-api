import { config } from 'dotenv';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'modules/user/user.repository';
import { JwtPayload } from '../dtos';
import { User } from 'modules/user/user.entity';
import { ConfigService } from '@nestjs/config';

config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
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
