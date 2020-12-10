import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { UserRole } from '../user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneOrFail(id).catch((e) => {
      throw new NotFoundException(`user with id '${id}' was not found`);
    });
  }

  async updateUserRole(id: string) {
    return await this.userRepository.update(id, { roles: UserRole.ADMIN });
  }
}
