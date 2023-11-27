import { ComponentProps, FC } from "react";

export const ArrowDownIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      stroke="#633CFF"
      strokeWidth="2"
      {...props}
    >
      <path d="M1 1L7 7L13 1" />
    </svg>
  );
};
