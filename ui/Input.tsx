import { ComponentProps, FC, ReactNode } from "react";
import { Typography } from "@/ui/Typography";
import { cn } from "@/utils/cn";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  Icon?: ReactNode;
};

export const Input: FC<InputProps> = ({
  label,
  error,
  Icon,
  className,
  ...rest
}) => {
  return (
    <label className={cn("flex flex-col gap-1", className)}>
      {label && <Typography variant="body-s">{label}</Typography>}
      <div
        data-state={error ? "error" : "default"}
        className={`flex items-center gap-2 rounded-sm border-1 border-secondary-300 bg-secondary-50 px-4 py-3 text-secondary-500 transition-all focus-within:border-primary-300 focus-within:shadow-accent data-[state=error]:border-error [&:not(:focus-within)]:data-[state=error]:text-error `}
      >
        {Icon}
        <input className="flex-1 outline-none" type="text" {...rest} />
        {error && (
          <div className="whitespace-nowrap text-xs text-error">{error}</div>
        )}
      </div>
    </label>
  );
};
