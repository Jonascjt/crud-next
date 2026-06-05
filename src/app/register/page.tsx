"use client";

import Link from "next/link";
import { useState } from "react";

import { api } from "@/src/http/api";
import { useNavigationRouter } from "@/src/hooks/use-navigation-router";
import { notifyErrorPopUp, notifySuccessPopUp } from "@/src/utils/notify-popups";
import { handleApiErrors } from "@/src/handlers/handle-api-erros";
import { Input, PasswordInput, Button } from "@/src/components";

export default function RegisterPage() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const { navigateToLogin } = useNavigationRouter();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const submitData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            course: formData.get('course'),
            semester: formData.get('semester'),
            phone: formData.get('phone'),
        }

        if (submitData.password !== submitData.confirmPassword) {
            notifyErrorPopUp('As senhas não coincidem. Por favor, verifique e tente novamente.');
            return;
        }

        try {
            await api.post('/users', submitData);
            notifySuccessPopUp('Cadastro realizado com sucesso! Faça login para acessar sua conta.');
            navigateToLogin();
        } catch (error) {
            handleApiErrors(error);
        }
    }
    
    return (
        <div className="container">
            <div className="mb-8">
                <h1 className="text-2xl">Olá,</h1>
                <h2>Cadastre-se.</h2>
            </div>

            <form className="flex flex-col gap-4 max-w-sm w-full" onSubmit={handleSubmit}>
                <Input id="name" name="name" label="Nome" />
                <Input id="email" name="email" label="E-mail" />
                <PasswordInput id="password" name="password" label="Senha" isVisible={isPasswordVisible} onClick={() => setIsPasswordVisible(prev => !prev)} />
                <PasswordInput id="confirmPassword" name="confirmPassword" label="Confirmar senha" isVisible={isConfirmPasswordVisible} onClick={() => setIsConfirmPasswordVisible(prev => !prev)} />
                <Input id="course" name="course" label="Curso" />
                <Input id="semester" name="semester" type="number" min="1" label="Semestre" />
                <Input id="phone" name="phone" type="tel" minLength={11} label="Telefone" />

                <Button type="submit" styles="mt-4">
                    Cadastrar
                </Button>
            </form>

            <div className="mt-2">
                <span className="font-light">Já possui uma conta? <Link href='/login' className="font-bold text-emerald-600 hover:text-emerald-700">Acesse sua conta</Link></span>
            </div>
        </div>
    )
}
