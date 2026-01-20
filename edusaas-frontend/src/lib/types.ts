export interface Course {
  id: string;
  name: string;
  description: string;
}
export interface Grade {
  id: string;
  score: number;
  feedback?: string;
  course: Course;
}
export interface Student {
  id: string;
  fullName: string;
  email: string;
  courses: Course[];
  grades: Grade[];
}
