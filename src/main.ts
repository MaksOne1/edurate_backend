import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CONFIG} from "config";
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionsFilter } from '../filters/database-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DatabaseExceptionsFilter());


  await app.listen(CONFIG.PORT, () => console.log(`[DEBUG] Application is running on port ${CONFIG.PORT}`));
}

bootstrap();
