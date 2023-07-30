import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';

export enum USER_ROLES {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user'
}

@Entity()
export class User extends BaseEntity {
  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: USER_ROLES.USER })
  role: USER_ROLES

  get isStaff(): boolean {
    return this.role === USER_ROLES.STAFF;
  }
}
