import { IsNumber, IsString } from 'class-validator';

export class CreateQualificationDto {
  @IsString()
  name: string;

  @IsNumber()
  classifierId: number;
}
