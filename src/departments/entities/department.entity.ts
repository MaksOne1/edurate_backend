import { BaseEntity } from '../../../entities/base.entity';
import { Faculty } from '../../faculties/entities/faculty.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Speciality } from '../../specialities/entities/speciality.entity';

@Entity()
export class Department extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.departments)
  faculty: Faculty

  @OneToMany(() => Speciality, (speciality) => speciality.department)
  specialities: Speciality[]
}
