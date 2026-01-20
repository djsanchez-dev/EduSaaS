"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    // ✅ Usa un ID real de estudiante que tengas en tu backend
    const studentId = "1dd2b74b-0fb3-43fa-a7af-e5b58bc1e53b";
    router.push(`/dashboard/${studentId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700">EduSaaS</h1>
      <p className="mt-4 text-gray-600">
        Tu portal académico para cursos, notas y progreso en tiempo real.
      </p>
      <button
        onClick={handleLogin}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Entrar al portal
      </button>
    </div>
  );
}
