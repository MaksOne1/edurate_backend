import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import { Repository } from 'typeorm';
import { List } from '../../types/global';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistic)
    private readonly statisticsRepository: Repository<Statistic>,
  ) {
  }

  async create(dto: CreateStatisticDto): Promise<Statistic> {
    const isExist = await this.statisticsRepository.exist({ where: dto });

    if (isExist) {
      throw new BadRequestException('Такая статистика уже существует.');
    }

    const statistic = this.statisticsRepository.create(dto);
    return this.statisticsRepository.save(statistic);
  }

  async findAll(count: number, page: number): Promise<List<Statistic>> {
    const [statistics, total] = await this.statisticsRepository.findAndCount({
      take: count,
      skip: count * (page - 1),
    });

    return {
      content: statistics,
      props: {
        currentPage: page,
        totalPages: Math.ceil(total / count),
        countItems: total,
      },
    };
  }

  async findOne(id: number): Promise<Statistic> {
    const statistic = await this.statisticsRepository.findOne({ where: { id } });

    if (!statistic) {
      throw new BadRequestException('Статистика с таким ID не существует.');
    }

    return statistic;
  }

  async update(id: number, dto: UpdateStatisticDto): Promise<Statistic> {
    const statistic = await this.findOne(id);

    return this.statisticsRepository.save({ ...statistic, ...dto });
  }

  async remove(id: number): Promise<Statistic> {
    const statistic = await this.findOne(id);

    return this.statisticsRepository.remove(statistic);
  }
}