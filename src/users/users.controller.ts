import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { MaxValuePipe } from '../../pipes/max-value.pipe';
import { Roles } from './roles.decorator';
import { USER_ROLES } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('/signup')
  // create(@Body() dto: CreateUserDto) {
  //   return this.usersService.singUp(dto);
  // }
  //
  // @Post('/login')
  // login(@Body() dto: LoginUserDto) {
  //   return this.usersService.login(dto);
  // }

  @Get()
  findAll(
    @Query('count', new MaxValuePipe(new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), 20)) count: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) page: number,
  ) {
    return this.usersService.findAll(count, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN) // todo: or only current user
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(USER_ROLES.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
