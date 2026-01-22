"use client";
import { use } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import DashboardMain from "@/app/components/DashboardMain";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="bg-white w-64 flex flex-col">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 bg-white">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
            className="size-8"
          />
          <span className="ml-3 text-gray-900 font-bold">EduSaaS</span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-2 py-4 space-y-2 border-r border-gray-200">
          <a
            href="#"
            className="block rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700"
          >
            Team
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700"
          >
            Projects
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700"
          >
            Calendar
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700"
          >
            Reports
          </a>
        </nav>

        {/* Perfil usuario */}
        <div className="border-t border-gray-200 p-4 flex items-center bg-gray-50">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
            className="size-10 rounded-full border border-gray-300"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Tom Cook</p>
            <p className="text-xs text-gray-500">tom@example.com</p>
          </div>
        </div>
      </aside>

      {/* Main content con scroll */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <header className="relative bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 h-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <DashboardMain studentId={id} />
        </div>
      </main>
    </div>
  );
}
