import { LinkIcon } from "@/ui/icons/LinkIcon";
import { FC } from "react";

type TabProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export const Tab: FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      onClick={onClick}
      className={`focus:outline-primary-300  transition-all cursor-pointer flex items-center gap-2 py-[1.1rem] px-7 font-semibold rounded-sm hover:text-primary-300 ${
        active ? "bg-primary-100 text-primary-300" : "text-secondary-400"
      }`}
    >
      <LinkIcon fill="currentColor" />
      {label}
    </div>
  );
};
