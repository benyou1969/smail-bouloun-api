import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthSignUpDto {
  @ApiProperty({ default: 'test' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 'test@test.test' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'testTest' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
