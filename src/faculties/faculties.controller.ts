import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { List } from '../../types/global';
import { Faculty } from './entities/faculty.entity';
import { AllowedFieldsPipe } from '../../pipes/allowed-fields.pipe';
import { MaxValuePipe } from '../../pipes/max-value.pipe';

@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Post()
  create(@Body() dto: CreateFacultyDto) {
    return this.facultiesService.create(dto);
  }

  @Get()
  findAll(
    @Query('count', new MaxValuePipe(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), 20)) count: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number,
  ): Promise<List<Faculty>> {
    return this.facultiesService.findAll(count, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Faculty> {
    return this.facultiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new AllowedFieldsPipe(['name', 'address', 'phone'])) dto: UpdateFacultyDto): Promise<Faculty> {
    return this.facultiesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Faculty> {
    return this.facultiesService.remove(+id);
  }
}
