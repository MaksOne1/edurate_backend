import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationStageDto } from './dto/create-education-stage.dto';
import { UpdateEducationStageDto } from './dto/update-education-stage.dto';
import { EducationStage } from './entities/education-stage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EducationStageService {
  constructor(
    @InjectRepository(EducationStage)
    private readonly educationStageRepository: Repository<EducationStage>,
  ) {
  }

  async create(dto: CreateEducationStageDto): Promise<EducationStage> {
    const educationStage = this.educationStageRepository.create(dto);
    return this.educationStageRepository.save(educationStage);
  }

  async findOne(id: number): Promise<EducationStage> {
    const educationStage = await this.educationStageRepository.findOne({ where: { id } });

    if (!educationStage) {
      throw new NotFoundException('Стадия обучения не найдена.');
    }

    return educationStage;
  }

  async update(id: number, dto: UpdateEducationStageDto): Promise<EducationStage> {
    const educationStage = await this.findOne(id);

    return this.educationStageRepository.save({ ...educationStage, ...dto });
  }

  async remove(id: number): Promise<EducationStage> {
    const educationStage = await this.findOne(id);
    return this.educationStageRepository.remove(educationStage);
  }
}