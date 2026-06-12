import Link from "next/link";
import { api } from "@/src/http/api";

interface User {
  id: number | string;
  name: string;
  email: string;
}

async function getUsers(): Promise<User[] | null> {
  try {
    
    const res = await api.get('/users'); 
    
    
    return Array.isArray(res.data) ? res.data : [];
    
  } catch (error: unknown) { 
    console.error("Erro ao buscar usuários do Nest:", error);
    return null; 
  }
}

export default async function ListUser() {
  const users = await getUsers();

  const isError = users === null;
  const isEmpty = users !== null && users.length === 0;

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black py-16 px-4">
      <main className="flex w-full max-w-3xl flex-col bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 p-8 sm:p-12">
        
        <div className="flex flex-col gap-2 mb-8 text-left border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Lista de Usuários
          </h1>
        </div>

        <div className="w-full">
          {isError && (
            <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg text-center">
              <p className="text-red-600 dark:text-red-400 font-medium">
                Falha ao buscar usuários. Verifique se o Back-end está ligado.
              </p>
            </div>
          )}

          {isEmpty && (
            <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
              Nenhum usuário encontrado no banco de dados.
            </p>
          )}

          {users && users.length > 0 && (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {users.map((user) => (
                <li key={user.id} className="flex items-center justify-between py-4">
                  
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {user.name}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {user.email}
                    </span>
                  </div>

                  <Link 
                    href={`/edit-user?id=${user.id}`} 
                    className="p-2 text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    title={`Editar ${user.name}`}
                  >
                    ✏️
                  </Link>
                  
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}