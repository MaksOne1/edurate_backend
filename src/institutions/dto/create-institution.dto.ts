import { INSTITUTION_TYPES } from '../entities/institution.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateInstitutionDto {
  @IsString({message: 'Не указано название заведения'})
  name: string;

  @IsNumber({  }, {message: 'Не указан тип заведения'})
  type: INSTITUTION_TYPES;

}
