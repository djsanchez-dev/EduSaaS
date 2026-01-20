import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/student.entity';
import { Course } from '../courses/course.entity';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(
    private readonly service: EnrollmentsService,
    @InjectRepository(Student) private studentsRepo: Repository<Student>,
    @InjectRepository(Course) private coursesRepo: Repository<Course>,
  ) {}

  @Post() async create(@Body() body: { studentId: string; courseId: string }) {
    const student = await this.studentsRepo.findOne({
      where: { id: body.studentId },
    });
    if (!student) {
      throw new NotFoundException(
        `Student with id ${body.studentId} not found`,
      );
    }
    const course = await this.coursesRepo.findOne({
      where: { id: body.courseId },
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${body.courseId} not found`);
    }
    return this.service.create(student, course);
  }

  @Get() findAll() {
    return this.service.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
