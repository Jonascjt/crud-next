"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/src/http/api"; 

export default function EditUserPage() {
  const id = useSearchParams().get("id");
  const [user, setUser] = useState({ name: "", email: "", course: "", semester: "", phone: "", password: "", confirmPassword: "" });


  useEffect(() => {
    if (id) {
      api.get(`/users/${id}`)
        .then(res => setUser({ ...res.data, password: "", confirmPassword: "" }))
        .catch(err => console.error("Erro ao buscar dados do usuário:", err));
    }
  }, [id]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user.password !== user.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await api.put(`/users/${id}`, user);
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Falha ao salvar as alterações no banco.");
    }
  };

  const handleChange = (field: string, value: string) => setUser({ ...user, [field]: value });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md font-sans">
      <h1 className="text-xl font-bold text-center">Editar Perfil</h1>
      
      <input type="text" placeholder="Nome" value={user.name} onChange={e => handleChange("name", e.target.value)} className="border p-2 rounded" required />
      <input type="email" placeholder="E-mail" value={user.email} onChange={e => handleChange("email", e.target.value)} className="border p-2 rounded" required />
      <input type="text" placeholder="Curso" value={user.course} onChange={e => handleChange("course", e.target.value)} className="border p-2 rounded" required />
      <input type="number" min="1" placeholder="Semestre" value={user.semester} onChange={e => handleChange("semester", e.target.value)} className="border p-2 rounded" required />
      <input type="tel" minLength={11} placeholder="Telefone" value={user.phone} onChange={e => handleChange("phone", e.target.value)} className="border p-2 rounded" required />
      
      <input type="password" placeholder="Nova Senha" value={user.password} onChange={e => handleChange("password", e.target.value)} className="border p-2 rounded" />
      <input type="password" placeholder="Confirmar Nova Senha" value={user.confirmPassword} onChange={e => handleChange("confirmPassword", e.target.value)} className="border p-2 rounded" />
      
      <button type="submit" className="bg-emerald-600 text-white p-2 rounded-lg font-medium hover:bg-emerald-500 transition-all">
        Salvar Alterações
      </button>
    </form>
  );
}