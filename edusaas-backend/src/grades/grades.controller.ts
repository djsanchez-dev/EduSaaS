import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { GradesService } from './grades.service';
import { Grade } from './grade.entity';

@Controller('grades')
export class GradesController {
  constructor(private readonly service: GradesService) {}

  @Post() async create(
    @Body() body: { enrollmentId: string; score: number; feedback?: string },
  ) {
    return this.service.create(body);
  }

  @Get() async findAll() {
    return this.service.findAll();
  }

  @Get(':id') async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id') async update(
    @Param('id') id: string,
    @Body() body: Partial<Grade>,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id') async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
