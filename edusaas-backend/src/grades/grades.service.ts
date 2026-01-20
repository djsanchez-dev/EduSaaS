import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { Enrollment } from '../enrollments/enrollment.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>,
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  async create(data: {
    enrollmentId: string;
    score: number;
    feedback?: string;
  }) {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id: data.enrollmentId },
      relations: ['student', 'course'],
    });
    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with id ${data.enrollmentId} not found`,
      );
    }
    const grade = this.gradeRepo.create({
      score: data.score,
      feedback: data.feedback,
      enrollment,
      student: enrollment.student,
    });
    return this.gradeRepo.save(grade);
  }

  async findAll() {
    return this.gradeRepo.find({
      relations: ['student', 'enrollment', 'enrollment.course'],
    });
  }

  async findOne(id: string) {
    const grade = await this.gradeRepo.findOne({
      where: { id },
      relations: ['student', 'enrollment', 'enrollment.course'],
    });
    if (!grade) {
      throw new NotFoundException(`Grade with id ${id} not found`);
    }
    return grade;
  }

  async update(id: string, data: Partial<Grade>) {
    const grade = await this.findOne(id);
    Object.assign(grade, data);
    return this.gradeRepo.save(grade);
  }

  async remove(id: string) {
    const grade = await this.findOne(id);
    return this.gradeRepo.remove(grade);
  }
}
