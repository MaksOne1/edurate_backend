import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClassifierDto } from './dto/create-classifier.dto';
import { UpdateClassifierDto } from './dto/update-classifier.dto';
import { Classifier } from './entities/classifier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../../types/global';

@Injectable()
export class ClassifiersService {
  constructor(
    @InjectRepository(Classifier)
    private readonly classifierRepository: Repository<Classifier>,
  ) {
  }

  async create(dto: CreateClassifierDto): Promise<Classifier> {
    const isExist = await this.classifierRepository.exist({ where: dto });

    if (isExist) {
      throw new BadRequestException('Такой код уже существует.');
    }

    const classifier = await this.classifierRepository.create(dto);

    return await this.classifierRepository.save(classifier);
  }

  async findAll(count: number, page: number): Promise<List<Classifier>> {
    const [classifiers, total] = await this.classifierRepository.findAndCount({
      take: count,
      skip: count * (page - 1),
      relations: ['faculty'],
      order: { id: 'ASC' },
    });

    return {
      content: classifiers,
      props: {
        currentPage: page,
        totalPages: Math.ceil(total / count),
        countItems: total,
      },
    };
  }

  async findOne(id: number): Promise<Classifier> {
    const classifier = await this.classifierRepository.findOne({ where: { id } });

    if (!classifier) {
      throw new BadRequestException('Такой код не существует.');
    }

    return classifier;
  }

  async update(id: number, dto: UpdateClassifierDto): Promise<Classifier> {
    const classifier = await this.findOne(id);

    return this.classifierRepository.save({ ...classifier, ...dto });
  }

  async remove(id: number): Promise<Classifier> {
    const classifier = await this.findOne(id);

    return this.classifierRepository.remove(classifier);
  }
}
