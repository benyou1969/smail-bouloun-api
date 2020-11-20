import { Repository, EntityRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as argon2 from 'argon2';

import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignInDto, AuthSignUpDto } from '../auth/dtos/';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpDto: AuthSignUpDto): Promise<User> {
    const { name, email, password } = authSignUpDto;
    const user = new User();
    user.id = uuid();
    user.name = name;
    user.email = email;
    user.password = await this.hashPassword(password);
    user.avatar = null;

    try {
      return await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email Already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authSignInInput: AuthSignInDto): Promise<User> {
    const { email, password } = authSignInInput;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      throw new UnauthorizedException('Wrong Credentials!');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }
}
