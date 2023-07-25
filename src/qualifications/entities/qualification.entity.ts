import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Classifier } from '../../classifiers/entities/classifier.entity';

@Entity()
export class Qualification extends BaseEntity {
  @Column()
  name: string;

  @OneToOne(() => Classifier)
  @JoinColumn()
  classifier: Classifier
}
