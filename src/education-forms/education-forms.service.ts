import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationFormDto } from './dto/create-education-form.dto';
import { UpdateEducationFormDto } from './dto/update-education-form.dto';
import { EducationForm } from './entities/education-form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EducationFormsService {
  constructor(
    @InjectRepository(EducationForm)
    private readonly educationFormRepository: Repository<EducationForm>,
  ) {
  }

  async create(dto: CreateEducationFormDto): Promise<EducationForm> {
    const educationForm = this.educationFormRepository.create(dto);
    return this.educationFormRepository.save(educationForm);
  }

  async findOne(id: number): Promise<EducationForm> {
    const educationForm = await this.educationFormRepository.findOne({ where: { id } });
    if (!educationForm) {
      throw new NotFoundException('Такой формы обучения не существует');
    }
    return educationForm;
  }

  async update(id: number, dto: UpdateEducationFormDto): Promise<EducationForm> {
    const educationForm = await this.findOne(id);
    this.educationFormRepository.merge(educationForm, dto);
    return this.educationFormRepository.save(educationForm);
  }

  async remove(id: number): Promise<EducationForm> {
    const educationForm = await this.findOne(id);
    return this.educationFormRepository.remove(educationForm);
  }
}