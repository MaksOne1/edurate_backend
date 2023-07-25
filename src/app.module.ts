import { Module } from '@nestjs/common';
import { InstitutionsModule } from './institutions/institutions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsModule } from './statistics/statistics.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { FacultiesModule } from './faculties/faculties.module';
import { DepartmentsModule } from './departments/departments.module';
import { ClassifiersModule } from './classifiers/classifiers.module';
import { QualificationsModule } from './qualifications/qualifications.module';
import { EducationStageModule } from './education-stage/education-stage.module';
import { EducationFormsModule } from './education-forms/education-forms.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from 'ormconfig'
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig,
    }),
    InstitutionsModule,
    StatisticsModule,
    SpecialitiesModule,
    FacultiesModule,
    DepartmentsModule,
    ClassifiersModule,
    QualificationsModule,
    EducationStageModule,
    EducationFormsModule,
    UsersModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
