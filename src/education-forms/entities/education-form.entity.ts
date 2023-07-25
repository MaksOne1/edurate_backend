import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Speciality } from './speciality.entity';

export enum EDUCATION_FORMS {
  'full-time', // очная
  'correspondence', // заочная
  'part-time', // очно-заочная
  'distance' // дистанционная
}

@Entity()
export class EducationForm extends BaseEntity {
  @Column({ type: 'enum', enum: EDUCATION_FORMS, unique: true })
  name: EDUCATION_FORMS;

  @ManyToMany(() => Speciality, (speciality) => speciality.forms)
  @JoinTable()
  specialities: Speciality[];
}