import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Inject, ParseIntPipe,
} from '@nestjs/common';

@Injectable()
export class MaxValuePipe implements PipeTransform {

  constructor(@Inject(ParseIntPipe) private readonly parseIntPipe: ParseIntPipe, private readonly maxValue: number) {}

  async transform(value: any) {
    const parsedValue = await this.parseIntPipe.transform(value, { type: 'param', metatype: Number });

    if (parsedValue > this.maxValue) {
      throw new BadRequestException('Значение не может быть больше максимального: ' + this.maxValue);
    }

    return parsedValue;
  }
}