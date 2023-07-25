import { IsString } from 'class-validator';

export class CreateClassifierDto {
  @IsString()
  code: string
}
