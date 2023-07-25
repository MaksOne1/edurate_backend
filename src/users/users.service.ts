import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AUTH } from '../../private.config';
import { List } from '../../types/global';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  async create(dto: CreateUserDto) {
    const isExist = await this.userRepository.exist({ where: { email: dto.email } });

    if (isExist) {
      throw new BadRequestException('Пользователь с таким email уже зарегистрирован');
    }

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Пароли не совпадают');
    }

    const hashedPassword = await bcrypt.hash(dto.password, AUTH.SALT_OR_ROUND);

    const user = await this.userRepository.create({ email: dto.email, password: hashedPassword });

    return this.userRepository.save(user);
  }

  async findAll(count: number, page: number): Promise<List<User>> {
    const [users, total] = await this.userRepository.findAndCount({
      take: count,
      skip: count * (page - 1),
    });

    return {
      content: users,
      props: {
        currentPage: page,
        totalPages: Math.ceil(total / count),
        countItems: total,
      },
    };
  }

  async findOneById(id: number, throwError = true): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user && throwError) {
      throw new NotFoundException('Пользователь с таким ID не найден');
    }

    return user;
  }

  async findOneBy(options: FindOneOptions<User>, throwError = true): Promise<User> {
    const user = await this.userRepository.findOne(options);

    if (!user && throwError) {
      throw new NotFoundException(`Пользователь с ${Object.entries(options.where).map(([key, value]) => `${key}: ${value}`).join(', ')} не найден`);
    }

    return user;
  }

  // todo
  async update(id: number, dto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
