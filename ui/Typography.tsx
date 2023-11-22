import { FC, PropsWithChildren } from "react";

export type TypographyProps = PropsWithChildren & {
  variant: "heading-m" | "heading-s" | "body-m" | "body-s";
};

export const Typography: FC<TypographyProps> = ({ variant, children }) => {
  switch (variant) {
    case "heading-m":
      return <h2 className="text-xl font-bold">{children}</h2>;
    case "heading-s":
      return <h3 className="text-base font-semibold">{children}</h3>;
    case "body-m":
      return <p className="text-base">{children}</p>;
    case "body-s":
      return <p className="text-xs">{children}</p>;
  }
};
