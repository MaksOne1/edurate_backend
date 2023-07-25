import { Module } from '@nestjs/common';
import { EducationFormsService } from './education-forms.service';
import { EducationFormsController } from './education-forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationForm } from './entities/education-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationForm])],
  controllers: [EducationFormsController],
  providers: [EducationFormsService]
})
export class EducationFormsModule {}
