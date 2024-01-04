import { cn } from "@/utils/cn";
import { FC } from "react";

type SkeletonProps = {
  variant: "avatar" | "block" | "text" | "text-xs";
};

export const Skeleton: FC<SkeletonProps> = ({ variant }) => {
  const className =
    variant === "avatar"
      ? "w-24 h-24 rounded-full"
      : variant === "block"
      ? "h-11 w-full rounded-sm"
      : variant === "text"
      ? "w-40 h-4 rounded-md"
      : "w-18 h-2 rounded-md";
  return <div className={cn("bg-[#EEE] transition-all", className)} />;
};
