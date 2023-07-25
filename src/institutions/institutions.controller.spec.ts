import { Test } from '@nestjs/testing';
import { InstitutionsController } from './institutions.controller';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('InstitutionsController', () => {
  let institutionsService: InstitutionsService;
  let institutionRepository: Repository<Institution>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        InstitutionsService,
        {
          provide: getRepositoryToken(Institution),
          useClass: Repository,
        },
      ],
    }).compile();

    institutionsService = moduleRef.get<InstitutionsService>(InstitutionsService);
    institutionRepository = moduleRef.get<Repository<Institution>>(getRepositoryToken(Institution));
  });

  describe('create', () => {
    it('should create and return an institution', async () => {
      const createDto: CreateInstitutionDto = {
        name: 'Test Institution',
        type: 0,
      };

      const entity = {
        ...createDto,
        id: 1,
        website: null,
        address: null,
        email: null,
        description: null,
      };

      institutionRepository.exist = jest.fn().mockResolvedValue(false);
      institutionRepository.create = jest.fn().mockReturnValue(entity);
      institutionRepository.save = jest.fn().mockResolvedValue(entity);

      const result = await institutionsService.create(createDto);

      expect(result).toEqual(entity);
    });

    it('should throw BadRequestException when an institution with the same name exists', async () => {
      const createDto: CreateInstitutionDto = {
        name: 'Test Institution',
        type: 0,
      };

      institutionRepository.exist = jest.fn().mockResolvedValue(true);

      await expect(institutionsService.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

});
