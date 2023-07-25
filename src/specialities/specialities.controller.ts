import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { List } from '../../types/global';
import { Speciality } from './entities/speciality.entity';
import { MaxValuePipe } from '../../pipes/max-value.pipe';
import { AllowedFieldsPipe } from '../../pipes/allowed-fields.pipe';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    return this.specialitiesService.create(createSpecialityDto);
  }

  @Get()
  findAll(
    @Query('count', new MaxValuePipe(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), 20)) count: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number,
    ): Promise<List<Speciality>> {
    return this.specialitiesService.findAll(count, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Speciality> {
    return this.specialitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new AllowedFieldsPipe(['name', 'term', 'form', 'stage'])) dto: UpdateSpecialityDto): Promise<Speciality> {
    return this.specialitiesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Speciality> {
    return this.specialitiesService.remove(+id);
  }
}
