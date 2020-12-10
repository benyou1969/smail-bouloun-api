import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';
@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(@GetUser() user: User) {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getUsers(@GetUser() user: User) {
    return user;
  }

  @Put(':id/role')
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRoleOfUser(@Param('id') id: string) {
    return await this.userService.updateUserRole(id);
  }
}
