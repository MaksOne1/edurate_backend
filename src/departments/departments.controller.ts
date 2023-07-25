import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { List } from '../../types/global';
import { Department } from './entities/department.entity';
import { AllowedFieldsPipe } from '../../pipes/allowed-fields.pipe';
import { MaxValuePipe } from '../../pipes/max-value.pipe';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll(
    @Query('count', new MaxValuePipe(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), 20)) count: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number,
  ): Promise<List<Department>> {
    return this.departmentsService.findAll(count, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new AllowedFieldsPipe(['name'])) dto: UpdateDepartmentDto): Promise<Department> {
    return this.departmentsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Department> {
    return this.departmentsService.remove(+id);
  }
}
