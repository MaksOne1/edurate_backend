import { Test, TestingModule } from '@nestjs/testing';
import { ClassifiersController } from './classifiers.controller';
import { ClassifiersService } from './classifiers.service';

describe('ClassifiersController', () => {
  let controller: ClassifiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassifiersController],
      providers: [ClassifiersService],
    }).compile();

    controller = module.get<ClassifiersController>(ClassifiersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
