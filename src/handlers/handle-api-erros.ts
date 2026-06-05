import { AxiosError } from "axios";
import { notifyErrorPopUp } from "../utils/notify-popups";

export const handleApiErrors = (error: unknown) => {
    if (error instanceof AxiosError) {
        const errorMessage: string | string[] = error.response?.data.message || error.message;
        if (Array.isArray(errorMessage)) {
            errorMessage.forEach((msg) => notifyErrorPopUp(msg));
        } else {
            notifyErrorPopUp(errorMessage);
        }
    } else {
        console.error('Unexpected error:', error);
        notifyErrorPopUp('Erro inesperado. Por favor, tente novamente.');
    }
}
