import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from 'src/modules/user/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { AuthSignInDto, AuthSignUpDto, JwtPayload } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto, ctx: Response) {
    console.log(authSignUpDto);
    const user = await this.userRepository.signUp(authSignUpDto);
    await this.createToken(user.email, user, ctx);
  }
  async signIn(authSignInDto: AuthSignInDto, res: Response) {
    const user = await this.userRepository.signIn(authSignInDto);
    return this.createToken(user.email, user, res);
  }

  async logout(user: User, res: Response) {
    const tokenVersion = await this.incrementTokenVersion(user);
    const payload: JwtPayload = {
      email: user.email,
      tokenVersion,
    };
    await this.jwtService.sign(payload, {
      expiresIn: '0s',
    });

    res.clearCookie('accessToken');
    res.clearCookie('jid');
    res.send({ loggedOut: true });
  }

  private async createToken(email: string, user: User, res: Response) {
    const payload: JwtPayload = {
      email: user.email,
      tokenVersion: user.tokenVersion,
    };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '15s',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // domain: 'localhost:8000',
    });
    const jid = await this.jwtService.sign(payload, {
      expiresIn: '10d',
    });

    res.cookie('jid', jid, {
      httpOnly: true,
      // domain: 'localhost:8000',
    });
    res.send({ user });
  }

  async incrementTokenVersion(user: User) {
    const found = await this.userRepository.findOne({ id: user.id });
    found.tokenVersion = found.tokenVersion + 1;
    await found.save();
    return found.tokenVersion;
  }

  async refreshToken(user: User, res: Response) {
    const tokenVersion = await this.incrementTokenVersion(user);
    const payload: JwtPayload = {
      email: user.email,
      tokenVersion,
    };
    const jid = await this.jwtService.sign(payload, {
      expiresIn: '10d',
    });

    res.cookie('jid', jid, {
      httpOnly: true,
      // domain: 'localhost:8000',
      expires: new Date(Date.now() + 900000),
    });
    res.clearCookie('accessToken');
    console.log('jid', jid);
    return res.send({
      jid: jid,
    });
  }
}
