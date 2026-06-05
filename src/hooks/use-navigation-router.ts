"use client";

import { useRouter } from 'next/navigation'

export const useNavigationRouter = () => {
    const router = useRouter();

    return {
        navigateToRegister: () => router.push('/register'),
        navigateToLogin: () => router.push('/login'),
    }
}
