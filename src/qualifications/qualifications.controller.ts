import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { QualificationsService } from './qualifications.service';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { List } from '../../types/global';
import { Qualification } from './entities/qualification.entity';
import { AllowedFieldsPipe } from '../../pipes/allowed-fields.pipe';
import { MaxValuePipe } from '../../pipes/max-value.pipe';

@Controller('qualifications')
export class QualificationsController {
  constructor(private readonly qualificationsService: QualificationsService) {
  }

  @Post()
  create(@Body() dto: CreateQualificationDto): Promise<Qualification> {
    return this.qualificationsService.create(dto);
  }

  @Get()
  findAll(
    @Query('count', new MaxValuePipe(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), 20)) count: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number,
  ): Promise<List<Qualification>> {
    return this.qualificationsService.findAll(count, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Qualification> {
    return this.qualificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new AllowedFieldsPipe(['name'])) dto: UpdateQualificationDto): Promise<Qualification> {
    return this.qualificationsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Qualification> {
    return this.qualificationsService.remove(+id);
  }
}
