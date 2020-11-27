import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { User } from '../user.entity';
@ApiTags('user')
@Controller('user')
export class UserController {
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getUsers(@GetUser() user: User) {
    return user;
  }
}
