import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Speciality } from './speciality.entity';

export enum EDUCATION_STAGES {
  'bachelor',
  'master'
}


@Entity()
export class EducationStage extends BaseEntity {

  @Column({ type: 'enum', enum: EDUCATION_STAGES, unique: true })
  name: EDUCATION_STAGES;

  @OneToMany(() => Speciality, (speciality) => speciality.stage)
  specialities: Speciality[]
}