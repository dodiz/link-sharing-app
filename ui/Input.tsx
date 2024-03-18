"use client";

import { ComponentProps, FC, useState } from "react";
import { Typography } from "@/ui/Typography";
import { cn } from "@/utils/cn";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  Icon?: FC<ComponentProps<"svg">>;
};

export const Input: FC<InputProps> = ({
  label,
  onFocus,
  onBlur,
  error,
  Icon,
  className,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label className={cn("flex flex-col gap-1", className)}>
      {label && <Typography variant="body-s">{label}</Typography>}
      <div
        className={`rounded-sm border-1 px-4 py-3 text-secondary-500 bg-secondary-50 flex items-center gap-2 transition-all ${
          isFocused
            ? "border-primary-300 shadow-accent"
            : error
            ? "border-error text-error"
            : "border-secondary-300"
        }`}
      >
        {Icon && <Icon />}
        <input
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className="outline-none flex-1"
          type="text"
          {...rest}
        />
        {error && (
          <div className="text-xs text-error whitespace-nowrap">{error}</div>
        )}
      </div>
    </label>
  );
};
