"use client";
import { useEffect, useState } from "react";
import api from "./../../lib/api";

interface Course {
  id: string;
  name: string;
  description: string;
}

interface Grade {
  id: string;
  score: number;
  feedback?: string;
  course: Course;
}

interface StudentDashboard {
  id: string;
  fullName: string;
  email: string;
  courses: Course[];
  grades: Grade[];
}

export default function DashboardMain({ studentId }: { studentId: string }) {
  const [student, setStudent] = useState<StudentDashboard | null>(null);

  useEffect(() => {
    console.log("Fetching dashboard for student ID:", studentId);
    api
      .get(`/students/${studentId}/dashboard`)
      .then((res) => setStudent(res.data));
  }, [studentId]);

  if (!student) return <p className="ml-64 p-8">Cargando...</p>;

  return (
    <main className="flex-1 p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
  {/* Bienvenida */}
  <section className="bg-green-100 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
      Bienvenido, {student.fullName} 👋
    </h2>
    <p className="mt-2 text-gray-700 text-sm md:text-base">
      Tienes {student.courses.length} cursos activos y tu promedio es{" "}
      {(
        student.grades.reduce((sum, g) => sum + g.score, 0) /
        student.grades.length
      ).toFixed(1)}
    </p>
  </section>

  {/* Cursos activos */}
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {student.courses.map((course, i) => (
      <div
        key={course.id}
        className={`p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
          i === 0
            ? "bg-blue-100"
            : i === 1
            ? "bg-green-100"
            : "bg-yellow-100"
        }`}
      >
        <h3 className="text-lg font-bold text-blue-800">{course.name}</h3>
        <p className="mt-1 text-gray-700 text-sm">Progreso: {65 + i * 10}%</p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition">
          Ver detalles
        </button>
      </div>
    ))}
  </section>

  {/* Tabla de notas */}
  <section>
    <h2 className="text-xl font-semibold text-blue-700 mb-4">Notas recientes</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="px-4 py-2 text-left">Curso</th>
            <th className="px-4 py-2 text-left">Nota</th>
            <th className="px-4 py-2 text-left">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {student.grades.map((grade) => (
            <tr key={grade.id} className="border-t">
              <td className="px-4 py-2">{grade.course.name}</td>
              <td className="px-4 py-2 text-green-600 font-bold">{grade.score}</td>
              <td className="px-4 py-2 text-gray-700">{grade.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
</main>

  );
}
