import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([UserRepository]), UserService],
})
export class UserModule {}
