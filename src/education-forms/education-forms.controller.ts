import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationFormsService } from './education-forms.service';
import { CreateEducationFormDto } from './dto/create-education-form.dto';
import { UpdateEducationFormDto } from './dto/update-education-form.dto';
import { EducationForm } from './entities/education-form.entity';

@Controller('education-forms')
export class EducationFormsController {
  constructor(private readonly educationFormsService: EducationFormsService) {}

  @Post()
  create(@Body() createEducationFormDto: CreateEducationFormDto): Promise<EducationForm> {
    return this.educationFormsService.create(createEducationFormDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EducationForm> {
    return this.educationFormsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationFormDto: UpdateEducationFormDto): Promise<EducationForm> {
    return this.educationFormsService.update(+id, updateEducationFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<EducationForm> {
    return this.educationFormsService.remove(+id);
  }
}
