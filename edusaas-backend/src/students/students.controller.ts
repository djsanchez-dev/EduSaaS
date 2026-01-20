import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly service: StudentsService) {}
  @Post() async create(@Body() body: Partial<Student>) {
    return this.service.create(body);
  }
  @Get() async findAll() {
    return this.service.findAll();
  }
  @Get(':id') async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Get(':id/dashboard') async getDashboard(@Param('id') id: string) {
    const student = await this.service.findOne(id);
    return {
      id: student.id,
      fullName: student.fullName,
      email: student.email,
      courses: student.enrollments.map((enroll) => ({
        id: enroll.course.id,
        name: enroll.course.name,
        description: enroll.course.description,
      })),
      grades: student.grades.map((grade) => ({
        id: grade.id,
        score: grade.score,
        feedback: grade.feedback,
        course: {
          id: grade.enrollment.course.id,
          name: grade.enrollment.course.name,
        },
      })),
    };
  }
}
