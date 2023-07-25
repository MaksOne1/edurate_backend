import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFacultyDto {
  @IsNumber()
  institutionId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
