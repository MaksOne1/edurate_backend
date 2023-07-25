import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { Faculty } from './entities/faculty.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../../types/global';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>
  ) {
  }

  async create(dto: CreateFacultyDto) {
    const isExist = await this.facultyRepository.exist({
      where: { institution: { id: dto.institutionId }, name: dto.name },
    });

    if (isExist) {
      throw new BadRequestException('Факультет с таким названием уже существует в данном заведении');
    }

    const faculty = await this.facultyRepository.create({
      name: dto.name,
      institution: { id: dto.institutionId },
    });

    return this.facultyRepository.save(faculty);
  }

  async findAll(count: number, page: number): Promise<List<Faculty>> {
    const [faculties, total] = await this.facultyRepository.findAndCount({
      take: count,
      skip: count * (page - 1),
      order: { id: 'ASC' },
      relations: ['departments'],
    });

    return {
      content: faculties,
      props: {
        currentPage: page,
        totalPages: Math.ceil(total / count),
        countItems: total,
      },
    };

  }

  async findOne(id: number): Promise<Faculty> {
    const faculty = await this.facultyRepository.findOne({
      where: { id },
      relations: ['departments']
    });

    if (!faculty) {
      throw new NotFoundException('Факультет с таким ID не найден');
    }

    return faculty;
  }

  async update(id: number, dto: UpdateFacultyDto): Promise<Faculty> {
    const faculty = await this.findOne(id);

    return this.facultyRepository.save({
      ...faculty,
      ...dto,
    });
  }

  async remove(id: number): Promise<Faculty> {
    const faculty = await this.findOne(id);

    return this.facultyRepository.remove(faculty);
  }
}
