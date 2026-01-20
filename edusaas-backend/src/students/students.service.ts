import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>) {}
  create(data: Partial<Student>) {
    const student = this.repo.create(data);
    return this.repo.save(student);
  }
  findAll() {
    return this.repo.find();
  }
  async findOne(id: string) {
    const student = await this.repo.findOne({
      where: { id },
      relations: [
        'enrollments',
        'enrollments.course',
        'grades',
        'grades.enrollment',
        'grades.enrollment.course',
      ],
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }
}
