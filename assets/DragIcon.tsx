import { ComponentProps, FC } from "react";

export const DragIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      width="12"
      height="6"
      viewBox="0 0 12 6"
      xmlns="http://www.w3.org/2000/svg"
      fill="#737373"
      {...props}
    >
      <rect width="12" height="1" />
      <rect y="5" width="12" height="1" />
    </svg>
  );
};
