import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isStaff: string;
}
