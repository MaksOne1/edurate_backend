import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Classifier extends BaseEntity {
  @Column({ unique: true })
  code: string;
}
