import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Faculty } from '../../faculties/entities/faculty.entity';

export enum INSTITUTION_TYPES {
  'University',
  'Institute',
  'Academy',
  'College',
  'Polytechnic',
  // 'Gymnasium',
// 'Lyceum',
// 'School',
}

@Entity()
export class Institution extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  address: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type: INSTITUTION_TYPES;

  @OneToMany(() => Faculty, (faculty) => faculty.institution)
  faculties: Faculty[];
}
