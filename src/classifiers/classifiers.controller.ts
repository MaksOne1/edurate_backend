import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, Query } from '@nestjs/common';
import { ClassifiersService } from './classifiers.service';
import { CreateClassifierDto } from './dto/create-classifier.dto';
import { UpdateClassifierDto } from './dto/update-classifier.dto';
import { AllowedFieldsPipe } from '../../pipes/allowed-fields.pipe';
import { MaxValuePipe } from '../../pipes/max-value.pipe';

@Controller('classifiers')
export class ClassifiersController {
  constructor(private readonly classifiersService: ClassifiersService) {}

  @Post()
  create(@Body() dto: CreateClassifierDto) {
    return this.classifiersService.create(dto);
  }

  @Get()
  findAll(
    @Query('count', new MaxValuePipe(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), 20)) count: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number,
  ) {
    return this.classifiersService.findAll(count, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classifiersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new AllowedFieldsPipe(['name'])) dto: UpdateClassifierDto) {
    return this.classifiersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classifiersService.remove(+id);
  }
}
