import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSpecialityDto } from './create-speciality.dto';

export class UpdateSpecialityDto extends OmitType(PartialType(CreateSpecialityDto), ['qualificationId', 'departmentId']) {}
