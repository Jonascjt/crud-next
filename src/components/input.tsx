type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    styles?: string;
};

export function Input({ id, name, type = "text", label, styles, ...rest }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={name} type={type} className={`register-input ${styles || ''}`} {...rest} />
        </div>
    )
}