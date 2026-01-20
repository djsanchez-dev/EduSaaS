import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Student } from '../students/student.entity';
import { Course } from '../courses/course.entity';
import { Grade } from '../grades/grade.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @OneToMany(() => Grade, (grade) => grade.enrollment)
  grades: Grade[];
}
