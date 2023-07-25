import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Speciality } from '../../specialities/entities/speciality.entity';

export enum EDUCATION_STAGES {
  'bachelor',
  'master'
}


@Entity()
export class EducationStage extends BaseEntity {

  @Column({ type: 'enum', enum: EDUCATION_STAGES, unique: true })
  type: EDUCATION_STAGES;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Speciality, (speciality) => speciality.stage)
  specialities: Speciality[]
}