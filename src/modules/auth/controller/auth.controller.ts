import { Response } from 'express';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';

import { AuthSignInDto, AuthSignUpDto } from '../dtos';
import { AuthService } from '../service/auth.service';
import { User } from 'src/modules/user/user.entity';
import { GetUser } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authSignUpDto: AuthSignUpDto, @Res() res: Response) {
    console.log(authSignUpDto);
    return await this.authService.signUp(authSignUpDto, res);
  }
  @Post('login')
  async signIn(@Body() authSignInDto: AuthSignInDto, @Res() res: Response) {
    return await this.authService.signIn(authSignInDto, res);
  }

  @Post('/refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@GetUser() user: User, @Res() res: Response) {
    await this.authService.refreshToken(user, res);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@GetUser() user: User, @Res() res: Response) {
    await this.authService.logout(user, res);
  }
}
