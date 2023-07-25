import { IsArray, IsNumber, IsString } from 'class-validator';
import { EDUCATION_TYPES } from '../entities/speciality.entity';

export class CreateSpecialityDto {
  @IsString()
  name: string;

  @IsNumber()
  term: number;

  @IsArray()
  forms: number[];

  @IsNumber()
  stage: number;

  @IsNumber()
  qualificationId: number;

  @IsNumber()
  departmentId: number;

  @IsNumber()
  type: EDUCATION_TYPES
}
