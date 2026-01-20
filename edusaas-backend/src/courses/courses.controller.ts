import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}
  @Post() async create(@Body() body: Partial<Course>) {
    return this.service.create(body);
  }
  @Get() async findAll() {
    return this.service.findAll();
  }
  @Get(':id') async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
