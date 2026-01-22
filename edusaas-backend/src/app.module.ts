import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { GradesModule } from './grades/grades.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'deivy',
      database: 'edusaas',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentsModule,
    CoursesModule,
    EnrollmentsModule,
    GradesModule,
    AuthModule,
  ],
})
export class AppModule {}
