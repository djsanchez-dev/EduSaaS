"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-blue-600 text-white w-64 h-screen flex flex-col p-6 space-y-6 fixed">
      <h1 className="text-2xl font-bold">EduSaaS</h1>
      <nav className="flex flex-col space-y-4 text-lg">
        <Link href="#" className="hover:text-yellow-300">📚 Cursos</Link>
        <Link href="#" className="hover:text-yellow-300">📝 Notas</Link>
        <Link href="#" className="hover:text-yellow-300">👤 Perfil</Link>
        <Link href="#" className="hover:text-yellow-300">⚙️ Configuración</Link>
      </nav>
    </aside>
  );
}
