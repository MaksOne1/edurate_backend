import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../../types/global';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {
  }

  async create(dto: CreateDepartmentDto) {
    const entity = {
      name: dto.name,
      faculty: { id: dto.facultyId },
    }

    const isExist = await this.departmentRepository.exist({
      where: entity,
    });

    if (isExist) {
      throw new BadRequestException('Кафедра с таким названием уже существует на данном факультете');
    }

    const department = await this.departmentRepository.create(entity);

    return this.departmentRepository.save(department);
  }

  async findAll(count: number, page: number): Promise<List<Department>> {
    const [departments, total] = await this.departmentRepository.findAndCount({
      take: count,
      skip: count * (page - 1),
      relations: ['faculty'],
      order: { id: 'ASC' },
    });

    return {
      content: departments,
      props: {
        currentPage: page,
        totalPages: Math.ceil(total / count),
        countItems: total,
      },
    };
  }

  async findOne(id: number): Promise<Department> {
    const institution = await this.departmentRepository.findOne({ where: { id }, relations: ['faculty'] });

    if (!institution) {
      throw new NotFoundException('Заведение с таким ID не существует.');
    }

    return institution;
  }

  async update(id: number, dto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.findOne(id);

    return this.departmentRepository.save({
      ...department,
      ...dto,
    });
  }

  async remove(id: number): Promise<Department> {
    const institution = await this.findOne(id);

    return this.departmentRepository.remove(institution);
  }
}
