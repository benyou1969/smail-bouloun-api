import { ApiProperty } from '@nestjs/swagger';

export class AuthSignInDto {
  @ApiProperty({ default: 'test@test.test' })
  email: string;
  @ApiProperty({ default: 'testTest' })
  password: string;
}
