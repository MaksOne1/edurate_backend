import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  facultyId: number;

}
