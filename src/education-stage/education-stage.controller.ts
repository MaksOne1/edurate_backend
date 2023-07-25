import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationStageService } from './education-stage.service';
import { CreateEducationStageDto } from './dto/create-education-stage.dto';
import { UpdateEducationStageDto } from './dto/update-education-stage.dto';
import { EducationStage } from './entities/education-stage.entity';

@Controller('education-stage')
export class EducationStageController {
  constructor(private readonly educationStageService: EducationStageService) {}

  @Post()
  create(@Body() dto: CreateEducationStageDto): Promise<EducationStage> {
    return this.educationStageService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EducationStage> {
    return this.educationStageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEducationStageDto): Promise<EducationStage> {
    return this.educationStageService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<EducationStage> {
    return this.educationStageService.remove(+id);
  }
}
