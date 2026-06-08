"use client";

import { useState } from "react";

export default function EditUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Alterações salvas!");
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-semibold mb-8">Editar Usuário</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-b border-gray-300 py-2 focus:outline-none focus:border-black"
          placeholder="Nome do usuário"
        />
        
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-gray-300 py-2 focus:outline-none focus:border-black"
          placeholder="E-mail"
        />

        <button 
          type="submit"
          className="mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}