import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="container">
            <div className="mb-8">
                <h1 className="text-2xl">Olá,</h1>
                <h2>Acesse sua conta.</h2>
            </div>

            <form className="flex flex-col gap-4 max-w-sm w-full" action="">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="text" className="login-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" className="login-input" />
                </div>

                <button
                    type="submit"
                    className="mt-4 text-white p-2 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-500 transition-all"
                >
                    Login
                </button>
            </form>

            <div className="mt-2">
                <span className="font-light">Não possui uma conta? <Link href='/cadastro' className="font-bold text-emerald-600 hover:text-emerald-700">Cadastre-se</Link></span>
            </div>
        </div>
    )
}
