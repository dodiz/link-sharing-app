import { FC } from "react";

type SkeletonProps = {
  variant: "avatar" | "block" | "text" | "text-xs";
};

export const Skeleton: FC<SkeletonProps> = ({ variant }) => {
  switch (variant) {
    case "avatar":
      return <div className="w-24 h-24 bg-[#EEE] rounded-full" />;
    case "block":
      return <div className="h-11 w-full rounded-sm bg-[#EEE]" />;
    case "text":
      return <div className="w-40 h-4 rounded-md bg-[#EEE]" />;
    case "text-xs":
      return <div className="w-18 h-2 rounded-md bg-[#EEE]" />;
  }
};
