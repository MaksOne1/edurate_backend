import { Test, TestingModule } from '@nestjs/testing';
import { EducationFormsService } from './education-forms.service';

describe('EducationFormsService', () => {
  let service: EducationFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationFormsService],
    }).compile();

    service = module.get<EducationFormsService>(EducationFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
