import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EDUCATION_FORMS } from '../entities/education-form.entity';

export class CreateEducationFormDto {
  @IsNumber()
  type: EDUCATION_FORMS;

  @IsString()
  @IsNotEmpty()
  name: string;
}
