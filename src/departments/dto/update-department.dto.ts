import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateDepartmentDto extends OmitType(PartialType(CreateDepartmentDto), ['facultyId']) {}
