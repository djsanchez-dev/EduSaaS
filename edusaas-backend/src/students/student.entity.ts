import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Grade } from '../grades/grade.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @OneToMany(() => Enrollment, (enroll) => enroll.student)
  enrollments: Enrollment[];

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}
