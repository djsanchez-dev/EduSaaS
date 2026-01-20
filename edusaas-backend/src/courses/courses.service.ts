import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private repo: Repository<Course>) {}
  create(data: Partial<Course>) {
    const course = this.repo.create(data);
    return this.repo.save(course);
  }
  findAll() {
    return this.repo.find();
  }
  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
