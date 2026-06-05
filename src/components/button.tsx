type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    styles?: string;
};

export function Button({ children, styles, ...rest }: ButtonProps) {
    return (
        <button className={`register-button ${styles || ''}`} {...rest}>
            {children}
        </button>
    )
}