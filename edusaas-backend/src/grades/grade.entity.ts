import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/student.entity';
import { Enrollment } from '../enrollments/enrollment.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  score: number;

  @Column({ nullable: true })
  feedback: string;

  @ManyToOne(() => Student, (student) => student.grades, { eager: true })
  student: Student;

  @ManyToOne(() => Enrollment, (enroll) => enroll.grades)
  enrollment: Enrollment;
}
