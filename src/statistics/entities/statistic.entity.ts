import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { EDUCATION_TYPES, Speciality } from '../../specialities/entities/speciality.entity';
import { EducationStage } from '../../education-stage/entities/education-stage.entity';
import { EducationForm } from '../../education-forms/entities/education-form.entity';

@Entity()
export class Statistic extends BaseEntity {
  @Column()
  year: number;

  @Column()
  score: number;

  @OneToOne(() => EducationStage)
  @JoinTable()
  stage: EducationStage;

  @OneToOne(() => EducationForm)
  @JoinTable()
  form: EducationForm;

  @Column()
  type: EDUCATION_TYPES;

  @ManyToOne(() => Speciality, (speciality) => speciality.statistics)
  speciality: Speciality;

  @Column({ type: 'json', default: {} })
  data: Record<string, any>;
}
