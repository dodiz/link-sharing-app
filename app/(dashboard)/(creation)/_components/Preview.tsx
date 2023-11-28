import { Skeleton } from "@/ui/Skeleton";
import { FC } from "react";

export const Preview: FC = () => {
  return (
    <div className="w-[56rem] bg-secondary-100 py-6 box-border flex items-center justify-center rounded-md">
      <div className="w-[30rem] h-[63rem] relative flex flex-col gap-10 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 308 632"
          fill="none"
          stroke="#737373"
          className="absolute w-full h-full top-0 left-0"
        >
          <path d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z" />
          <path d="M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z" />
        </svg>
        <div className="flex flex-col w-full items-center gap-6">
          <Skeleton variant="avatar" />
          <div className="flex flex-col gap-4 w-full items-center">
            <Skeleton variant="text" />
            <Skeleton variant="text-xs" />
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full px-8">
          <Skeleton variant="block" />
          <Skeleton variant="block" />
          <Skeleton variant="block" />
          <Skeleton variant="block" />
          <Skeleton variant="block" />
        </div>
      </div>
    </div>
  );
};
