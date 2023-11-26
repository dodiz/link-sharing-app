import { ComponentProps, ComponentPropsWithoutRef, ElementType } from "react";

export type ButtonProps<T extends ElementType> = ComponentProps<"button"> & {
  as?: T;
  variant?: "primary" | "secondary";
  label: string;
};

export const Button = <T extends ElementType = "button">({
  variant = "primary",
  label,
  as,
  ...rest
}: ButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const Component = as || "button";
  return (
    <Component
      className={`transition-all flex justify-center items-center py-[1.1rem] px-7 rounded-sm font-semibold disabled:opacity-25 ${
        variant === "primary"
          ? "bg-primary-300 hover:bg-primary-200 hover:shadow-accent text-white"
          : "bg-secondary-100 hover:bg-primary-100 border-1 text-primary-300 border-primary-300  disabled:bg-secondary-300"
      }`}
      {...rest}
    >
      {label}
    </Component>
  );
};
