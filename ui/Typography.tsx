import { cn } from "@/utils/cn";
import { FC, PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren & {
  variant: "heading-m" | "heading-s" | "body-m" | "body-s";
  className?: string;
};

export const Typography: FC<TypographyProps> = ({
  variant,
  children,
  className,
}) => {
  switch (variant) {
    case "heading-m":
      return <h2 className={cn("text-xl font-bold", className)}>{children}</h2>;
    case "heading-s":
      return (
        <h3 className={cn("text-base font-semibold", className)}>{children}</h3>
      );
    case "body-m":
      return <p className={cn("text-base", className)}>{children}</p>;
    case "body-s":
      return <p className={cn("text-xs", className)}>{children}</p>;
  }
};
