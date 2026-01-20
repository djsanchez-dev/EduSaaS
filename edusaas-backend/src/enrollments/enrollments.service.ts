import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Student } from '../students/student.entity';
import { Course } from '../courses/course.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment) private repo: Repository<Enrollment>,
  ) {}
  async create(student: Student, course: Course) {
    const enrollment = this.repo.create({ student, course });
    return this.repo.save(enrollment);
  }
  findAll() {
    return this.repo.find({ relations: ['student', 'course'] });
  }
  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['student', 'course'],
    });
  }
}
