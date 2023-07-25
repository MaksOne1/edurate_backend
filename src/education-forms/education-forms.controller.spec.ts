import { Test, TestingModule } from '@nestjs/testing';
import { EducationFormsController } from './education-forms.controller';
import { EducationFormsService } from './education-forms.service';

describe('EducationFormsController', () => {
  let controller: EducationFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationFormsController],
      providers: [EducationFormsService],
    }).compile();

    controller = module.get<EducationFormsController>(EducationFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
