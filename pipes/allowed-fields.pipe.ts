import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AllowedFieldsPipe implements PipeTransform {
  constructor(private allowedFields: string[]) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype) {
      return value;
    }

    const dtoInstance = plainToClass(metatype, value);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new BadRequestException('При валидации данных произошла ошибка');
    }

    for (const field of Object.keys(value)) {
      if (!this.allowedFields.includes(field)) {
        throw new BadRequestException(`Было передано запрещенное для изменения или несуществующее поле: ${field}`);
      }
    }

    return value;
  }
}