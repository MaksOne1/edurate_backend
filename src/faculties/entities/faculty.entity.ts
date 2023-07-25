import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Institution } from '../../institutions/entities/institution.entity';
import { Department } from '../../departments/entities/department.entity';

@Entity()
export class Faculty extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => Institution, (institution) => institution.faculties)
  institution: Institution;

  @OneToMany(() => Department, (department) => department.faculty)
  departments: Department[];
}

