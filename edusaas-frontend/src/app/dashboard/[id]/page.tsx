"use client";
import { use } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import DashboardMain from "@/app/components/DashboardMain";

export default function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <DashboardMain studentId={id} />
      </div>
    </div>
  );
}
