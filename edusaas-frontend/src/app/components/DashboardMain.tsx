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
    <main className="ml-64 p-8 space-y-8 bg-gray-50 min-h-screen">
      <section className="bg-green-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-blue-700">
          Bienvenido, {student.fullName} 👋
        </h2>
        <p className="text-gray-700">
          Tienes {student.courses.length} cursos activos y tu promedio es{" "}
          {(
            student.grades.reduce((sum, g) => sum + g.score, 0) /
            student.grades.length
          ).toFixed(1)}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {student.courses.map((course, i) => (
          <div
            key={course.id}
            className={`p-4 rounded-lg shadow hover:shadow-lg transition ${
              i === 0
                ? "bg-blue-100"
                : i === 1
                ? "bg-green-100"
                : "bg-yellow-100"
            }`}
          >
            <h3 className="text-lg font-bold text-blue-800">{course.name}</h3>
            <p className="text-gray-700">Progreso: {65 + i * 10}%</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Ver detalles
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-blue-700">Notas recientes</h2>
        <table className="table-auto border mt-4 w-full bg-white rounded shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Curso</th>
              <th className="border px-4 py-2">Nota</th>
              <th className="border px-4 py-2">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {student.grades.map((grade) => (
              <tr key={grade.id}>
                <td className="border px-4 py-2">{grade.course.name}</td>
                <td className="border px-4 py-2 text-green-600 font-bold">
                  {grade.score}
                </td>
                <td className="border px-4 py-2">{grade.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
