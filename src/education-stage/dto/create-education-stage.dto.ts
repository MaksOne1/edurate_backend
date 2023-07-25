import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EDUCATION_STAGES } from '../entities/education-stage.entity';

export class CreateEducationStageDto {
  @IsNumber()
  @IsNotEmpty()
  type: EDUCATION_STAGES;

  @IsString()
  @IsNotEmpty()
  name: string;
}
