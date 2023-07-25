import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiersService } from './classifiers.service';

describe('ClassifiersService', () => {
  let service: ClassifiersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassifiersService],
    }).compile();

    service = module.get<ClassifiersService>(ClassifiersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
