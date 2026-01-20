import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { Student } from 'src/students/student.entity';
import { Course } from 'src/courses/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Student, Course])],
  providers: [EnrollmentsService],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}
