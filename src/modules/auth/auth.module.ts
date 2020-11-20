import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'TopSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
