import { Test } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { InstitutionsService } from '../institutions/institutions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Institution } from '../institutions/entities/institution.entity';
import { Repository } from 'typeorm';
import { Statistic } from './entities/statistic.entity';

describe('StatisticsController', () => {
  let statisticService: StatisticsService;
  let statisticRepository: Repository<Statistic>

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: getRepositoryToken(Statistic),
          useClass: Repository,
        },
      ],
    }).compile();

    statisticService = moduleRef.get(InstitutionsService);
    statisticRepository = moduleRef.get(getRepositoryToken(Institution));
  });

  it.todo('should be defined');
});
