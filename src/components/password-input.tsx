import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    isVisible: boolean;
    onClick: () => void;
    styles?: string;
    label?: string;

}

export function PasswordInput({ id, name, label="", styles, isVisible, onClick, ...rest }: PasswordInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id}>{label}</label>
            <div className="relative w-full">
                <input id={id} name={name} type={isVisible ? "text" : "password"} className={`register-input w-full ${styles || ''}`} {...rest} />
                {isVisible ? (
                    <IoMdEyeOff onClick={onClick} className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-600 cursor-pointer transition-colors" size={20} />
                ) : (
                    <IoMdEye onClick={onClick} className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-600 cursor-pointer transition-colors" size={20} />
                )}
            </div>
        </div>
    );
}