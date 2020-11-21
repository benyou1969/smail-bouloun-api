import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UserController {
  @Get()
  getUsers() {
    return ['Ben', 'Jack'];
  }
}
