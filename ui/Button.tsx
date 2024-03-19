import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";
import { SpinnerIcon } from "@/assets/SpinnerIcon";
import { cn } from "@/utils/cn";

type ButtonProps<T extends ElementType> = ComponentProps<"button"> &
  PropsWithChildren & {
    as?: T;
    variant?: "primary" | "secondary";
    loading?: boolean;
  };

export const Button = <T extends ElementType = "button">({
  variant = "primary",
  as,
  children,
  className,
  loading,
  disabled,
  ...rest
}: ButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const Component = as || "button";
  return (
    <Component
      disabled={disabled || loading}
      className={cn(
        `flex items-center justify-center gap-2 rounded-sm px-7 py-[1.1rem] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-75 ${
          variant === "primary"
            ? "bg-primary-300 text-white hover:bg-primary-200 hover:shadow-accent"
            : "border-1  border-primary-300 bg-secondary-50 text-primary-300 hover:bg-primary-100  disabled:bg-secondary-300"
        }`,
        className,
      )}
      {...rest}
    >
      {!loading && <SpinnerIcon />}
      {children}
    </Component>
  );
};
