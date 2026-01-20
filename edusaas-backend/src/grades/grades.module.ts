import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { Enrollment } from 'src/enrollments/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Enrollment])],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}
