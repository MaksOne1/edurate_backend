import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, Query } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { AllowedFieldsPipe } from '../../pipes/allowed-fields.pipe';
import { Institution } from './entities/institution.entity';
import { List } from '../../types/global';
import { MaxValuePipe } from '../../pipes/max-value.pipe';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {
  }

  @Post()
  create(@Body() dto: CreateInstitutionDto): Promise<Institution> {
    return this.institutionsService.create(dto);
  }

  @Get()
  findAll(
    @Query('count', new MaxValuePipe(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), 20)) count: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number,
  ): Promise<List<Institution>> {
    return this.institutionsService.findAll(count, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Institution> {
    return this.institutionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new AllowedFieldsPipe(['name', 'type', 'website', 'address', 'email', 'description'])) dto: UpdateInstitutionDto,
  ): Promise<Institution> {
    return this.institutionsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Institution> {
    return this.institutionsService.remove(+id);
  }
}
