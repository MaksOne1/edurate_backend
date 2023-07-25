import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitutionDto } from './create-institution.dto';
import { IsEmail, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {
  @IsOptional()
  @IsUrl({ require_valid_protocol: true})
  website: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(2500)
  description: string;
}
