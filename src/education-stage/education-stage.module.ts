import { Module } from '@nestjs/common';
import { EducationStageService } from './education-stage.service';
import { EducationStageController } from './education-stage.controller';
import { EducationStage } from './entities/education-stage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EducationStage])],
  controllers: [EducationStageController],
  providers: [EducationStageService]
})
export class EducationStageModule {}
