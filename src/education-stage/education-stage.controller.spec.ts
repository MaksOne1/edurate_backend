import { Test, TestingModule } from '@nestjs/testing';
import { EducationStageController } from './education-stage.controller';
import { EducationStageService } from './education-stage.service';

describe('EducationStageController', () => {
  let controller: EducationStageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationStageController],
      providers: [EducationStageService],
    }).compile();

    controller = module.get<EducationStageController>(EducationStageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
