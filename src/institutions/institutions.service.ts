import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../../types/global';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {
  }

  async create(dto: CreateInstitutionDto): Promise<Institution> {

    const isEntityExists = await this.institutionRepository.exist({ where: { name: dto.name } });

    if (isEntityExists) {
      throw new BadRequestException('Заведения с таким названием уже существует.');
    }

    const entity = await this.institutionRepository.create(dto);

    return await this.institutionRepository.save(entity);
  }

  async findAll(count: number, page: number): Promise<List<Institution>> {
    const [institutions, total] = await this.institutionRepository.findAndCount({
      take: count,
      skip: count * (page - 1),
      relations: ['faculties'],
      order: { id: 'ASC' },
    });

    return {
      content: institutions,
      props: {
        currentPage: page,
        totalPages: Math.ceil(total / count),
        countItems: total,
      },
    };
  }

  async findOne(id: number): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({ where: { id }, relations: ['faculties'] });

    if (!institution) {
      throw new NotFoundException('Заведение с таким ID не существует.');
    }

    return institution;
  }

  async update(id: number, dto: UpdateInstitutionDto): Promise<Institution> {
    const institution = await this.findOne(id);

    return this.institutionRepository.save({
      ...institution,
      ...dto,
    });
  }

  async remove(id: number): Promise<Institution> {
    const institution = await this.findOne(id);

    return this.institutionRepository.remove(institution);
  }
}
