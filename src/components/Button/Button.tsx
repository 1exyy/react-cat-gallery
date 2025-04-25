import React, {ButtonHTMLAttributes, ReactNode} from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline";
type Size = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  onClick,
                                                  variant = "primary",
                                                  size = "medium",
                                                  disabled = false,
                                                  loading = false,
                                                  className = "",
                                                  ...rest
                                              }) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                styles[size],
                className
            )}
            onClick={onClick}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? <span className={styles.loader}></span> : children}
        </button>
    );
};

