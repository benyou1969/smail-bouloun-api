import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtStrategy } from './strategies/jwt-auth.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, JwtAuthGuard, RolesGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
