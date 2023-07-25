import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateFacultyDto } from './create-faculty.dto';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateFacultyDto extends OmitType(PartialType(CreateFacultyDto), ['institutionId']) {
  @IsOptional()
  @IsString()
  address: string

  @IsOptional()
  @IsPhoneNumber()
  phone: string
}
