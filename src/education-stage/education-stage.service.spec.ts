import { Test, TestingModule } from '@nestjs/testing';
import { EducationStageService } from './education-stage.service';

describe('EducationStageService', () => {
  let service: EducationStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationStageService],
    }).compile();

    service = module.get<EducationStageService>(EducationStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
