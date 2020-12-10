import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { GenericEntity } from 'src/common/entities/generic.entity';

import { BeforeInsert, Column, Entity, Unique } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  roles: UserRole;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLocaleLowerCase();
  }

  async validatePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}
