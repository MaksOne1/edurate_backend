import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { Speciality } from './entities/speciality.entity';
import { List } from '../../types/global';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDepartmentDto } from '../departments/dto/update-department.dto';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectRepository(Speciality)
    private readonly specialitiesRepository: Repository<Speciality>,
  ) {
  }

  async create(dto: CreateSpecialityDto): Promise<Speciality> {
    const { departmentId, qualificationId, stage, forms, ...rest } = dto;
    const entity = {
      department: {
        id: departmentId,
      },
      qualification: {
        id: qualificationId,
      },
      ...rest
    };

    const isExist = await this.specialitiesRepository.exist({
      where: entity,
    });

    if (isExist) {
      throw new BadRequestException('Такая специальность уже существует в данной кафедре');
    }

    const speciality = this.specialitiesRepository.create({
      ...entity,
      forms: forms.map(form => ({ id: form })),
      stage: { id: stage },
    });

    return this.specialitiesRepository.save(speciality);
  }

  async findAll(count: number, page: number): Promise<List<Speciality>> {

    const [specialities, total] = await this.specialitiesRepository.findAndCount({
      take: count,
      skip: count * (page - 1),
      relations: ['department', 'qualification', 'forms', 'stage', 'statistics'],
      order: { id: 'ASC' },
    });

    return {
      content: specialities,
      props: {
        currentPage: page,
        totalPages: Math.ceil(total / count),
        countItems: total,
      },
    };
  }

  async findOne(id: number): Promise<Speciality> {
    const speciality = await this.specialitiesRepository.findOne({
      where: { id },
      relations: ['department', 'qualification', 'forms', 'stage', 'statistics'],
    });

    if (!speciality) {
      throw new NotFoundException('Заведение с таким ID не существует.');
    }

    return speciality;
  }

  async update(id: number, dto: UpdateDepartmentDto): Promise<Speciality> {
    const speciality = await this.findOne(id);

    return this.specialitiesRepository.save({
      ...speciality,
      ...dto,
    });
  }

  async remove(id: number): Promise<Speciality> {
    const speciality = await this.findOne(id);

    return this.specialitiesRepository.remove(speciality);
  }
}
