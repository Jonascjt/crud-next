"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "../../http/api";

export default function EditUserPage() {
  const id = useSearchParams().get("id");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/usuarios/${id}`, { name, email });
    alert("Usuário atualizado com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold text-center">Editar Usuário</h1>
      <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" required />
      <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" required />
      <button type="submit" className="bg-green-600 text-white p-2 rounded font-medium hover:bg-green-700">Salvar</button>
    </form>
  );
}