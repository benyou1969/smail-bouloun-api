import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { GenericEntity } from 'src/common/entities/generic.entity';

import { Column, Entity, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User extends GenericEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
  isOnline: boolean;

  @Column('int', { default: 0 })
  tokenVersion: number;

  async validatePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}
