"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:3000/auth/login", { email, password });
    localStorage.setItem("token", res.data.access_token);
    router.push("/dashboard/1dd2b74b-0fb3-43fa-a7af-e5b58bc1e53b"); // id real del estudiante
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 space-y-4">
      <h1 className="text-4xl font-bold text-blue-700">EduSaaS</h1>
      <input
        type="email"
        placeholder="Email"
        className="border px-4 py-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border px-4 py-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Entrar al portal
      </button>
    </div>
  );
}
