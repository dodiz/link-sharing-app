import { ComponentProps, FC } from "react";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  label: string;
};

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  label,
  ...rest
}) => {
  return (
    <button
      className={`transition-all flex justify-center items-center py-[1.1rem] px-7 rounded-sm font-semibold disabled:opacity-25 ${
        variant === "primary"
          ? "bg-primary-300 hover:bg-primary-200 hover:shadow-accent text-white"
          : "bg-secondary-100 hover:bg-primary-100 border-1 text-primary-300 border-primary-300  disabled:bg-secondary-300"
      }`}
      {...rest}
    >
      {label}
    </button>
  );
};
