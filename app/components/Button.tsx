import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-foreground hover:bg-accent-hover border border-accent",
  secondary:
    "bg-foreground text-background hover:opacity-90 border border-foreground",
  outline:
    "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-[52px] py-4 text-sm uppercase tracking-[0.35px] rounded-[20px] transition-colors duration-200 font-display-sans font-bold " +
    variantStyles[variant] +
    " " +
    (disabled ? "opacity-50 cursor-not-allowed " : "") +
    className;

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={base} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
