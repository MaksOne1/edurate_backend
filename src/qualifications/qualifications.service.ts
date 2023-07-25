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
    const entity = {
      name: dto.name,
      classifier: { id: dto.classifierId },
    }
    const isExist = await this.qualificationRepository.exist({
      where: entity,
    });

    if (isExist) {
      throw new BadRequestException('Такая квалификация уже существует');
    }

    const qualification = await this.qualificationRepository.create(entity);

    return this.qualificationRepository.save(qualification);
  }

  async findAll(count: number, page: number): Promise<List<Qualification>> {
    const [qualifications, total] = await this.qualificationRepository.findAndCount({
      take: count,
      skip: count * (page - 1),
      relations: ['classifier'],
      order: { id: 'ASC' },
    });

    return {
      content: qualifications,
      props: {
        currentPage: page,
        totalPages: Math.ceil(total / count),
        countItems: total,
      },
    };
  }

  async findOne(id: number): Promise<Qualification> {
    const qualification = await this.qualificationRepository.findOne({ where: { id } });

    if (!qualification) {
      throw new NotFoundException('Квалификация не найдена');
    }

    return qualification;
  }

  async update(id: number, dto: UpdateQualificationDto): Promise<Qualification> {
    const qualification = await this.findOne(id);

    return this.qualificationRepository.save({
      ...qualification,
      ...dto,
    });
  }

  async remove(id: number): Promise<Qualification> {
    const qualification = await this.findOne(id);

    return this.qualificationRepository.remove(qualification);
  }
}
