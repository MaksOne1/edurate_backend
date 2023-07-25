import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { Qualification } from './entities/qualification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../../types/global';

@Injectable()
export class QualificationsService {
  constructor(
    @InjectRepository(Qualification)
    private readonly qualificationRepository: Repository<Qualification>,
  ) {
  }

  async create(dto: CreateQualificationDto): Promise<Qualification> {
    const isExist = await this.qualificationRepository.exist({ where: dto });

    if (isExist) {
      throw new BadRequestException('Такая квалификация уже существует');
    }

    const qualification = await this.qualificationRepository.create(dto);

    return await this.qualificationRepository.save(qualification);
  }

  async findAll(): Promise<List<Qualification>> {
    return `This action returns all qualifications`;
  }

  async findOne(id: number): Promise<Qualification> {
    const qualification = await this.qualificationRepository.findOne({ where: { id } });

    if (!qualification) {
      throw new NotFoundException('Квалификация не найдена');
    }

    return qualification;
  }

  async update(id: number, dto: UpdateQualificationDto): Promise<Qualification> {
    const qualification = await this.findOne(id)


    return this.qualificationRepository.update({
      ...qualification,
      ...dto
    })
  }

  remove(id: number): Promise<Qualification> {
    return `This action removes a #${id} qualification`;
  }
}
