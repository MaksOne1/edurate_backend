import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationStageDto } from './create-education-stage.dto';

export class UpdateEducationStageDto extends PartialType(CreateEducationStageDto) {}
