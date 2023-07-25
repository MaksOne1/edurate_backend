import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Qualification } from '../../qualifications/entities/qualification.entity';
import { Department } from '../../departments/entities/department.entity';
import { Statistic } from '../../statistics/entities/statistic.entity';
import { EducationForm } from '../../education-forms/entities/education-form.entity';
import { EducationStage } from '../../education-stage/entities/education-stage.entity';

export enum EDUCATION_TYPES {
  'FREE',
  'PAID',
}

@Entity()
export class Speciality extends BaseEntity {
  @Column()
  name: string;

  @Column()
  term: number;

  @Column({ type: 'enum', enum: EDUCATION_TYPES })
  type: EDUCATION_TYPES;

  @ManyToOne(() => EducationStage, (stage) => stage.specialities)
  stage: EducationStage;

  @ManyToMany(() => EducationForm, (form) => form.specialities)
  @JoinTable()
  forms: EducationForm[];

  @OneToOne(() => Qualification)
  @JoinColumn()
  qualification: Qualification;

  @ManyToOne(() => Department, (department) => department.specialities)
  department: Department;

  @OneToMany(() => Statistic, (statistic) => statistic.speciality)
  statistics: Statistic[];
}
