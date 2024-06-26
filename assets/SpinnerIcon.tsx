import { ComponentProps, FC } from "react";

export const SpinnerIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeOpacity={0.25}
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        fillOpacity={0.75}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
