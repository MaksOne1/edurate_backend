import { Module } from '@nestjs/common';
import { ClassifiersService } from './classifiers.service';
import { ClassifiersController } from './classifiers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classifier } from './entities/classifier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classifier])],
  controllers: [ClassifiersController],
  providers: [ClassifiersService]
})
export class ClassifiersModule {}
