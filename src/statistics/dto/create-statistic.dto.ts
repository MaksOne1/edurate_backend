import { EducationStage } from '../../education-stage/entities/education-stage.entity';
import { EducationForm } from '../../education-forms/entities/education-form.entity';
import { EDUCATION_TYPES } from '../../specialities/entities/speciality.entity';
import { IsNumber, IsObject } from 'class-validator';

export class CreateStatisticDto {

  @IsNumber()
  year: number;

  @IsNumber()
  score: number;

  @IsNumber()
  stage: EducationStage;

  @IsNumber()
  formId: EducationForm;

  @IsNumber()
  type: EDUCATION_TYPES;

  @IsNumber()
  specialityId: number;

  @IsObject()
  data: Record<string, any>;


}
