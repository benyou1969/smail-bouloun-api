import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategies/jwt-auth.strategy';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'TopSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [JwtStrategy, UserService],
  exports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtStrategy,
    PassportModule,
  ],
})
export class UserModule {}
