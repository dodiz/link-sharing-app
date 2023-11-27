"use client";

import { FC, ReactNode, useState } from "react";
import { LinkIcon } from "@/assets/LinkIcon";
import { ArrowDownIcon } from "@/assets/ArrowDownIcon";
import { useClickOutside } from "@/hooks/useClickOutside";

type Option = {
  label: string;
  value: string;
  Icon: ReactNode;
};

type SelectProps = {
  label: string;
  selected: Option | null;
  onChange: (value: Option) => void;
  options: Option[];
};

export const Select: FC<SelectProps> = ({
  options,
  label,
  selected,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const ref = useClickOutside(() => setShow(false));

  const handleChoose = (item: Option) => {
    onChange(item);
    setShow(false);
  };

  return (
    <div
      className="relative"
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      ref={ref}
    >
      <div
        tabIndex={0}
        className={`transition-all border-1 cursor-pointer flex items-center gap-3 py-3 px-4 font-semibold rounded-sm bg-white ${
          show ? "border-primary-300 shadow-accent" : "border-secondary-300"
        }`}
      >
        {selected === null ? <LinkIcon fill="currentColor" /> : selected.Icon}
        <div className="flex-1">
          {selected === null ? label : selected.label}
        </div>
        <ArrowDownIcon className={`transition-all ${show && "rotate-180"}`} />
      </div>
      <div
        className={`transition-all rounded-sm border-1 px-4 border-secondary-300 absolute top-15 left-0 w-full shadow-base ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        {options.map((item, i) => (
          <div
            tabIndex={0}
            onClick={() => handleChoose(item)}
            key={item.value}
            onKeyDown={(e) => e.key === "Enter" && handleChoose(item)}
            className="cursor-pointer flex items-center gap-3 py-3 border-secondary-300 hover:text-primary-300 border-b-1 last-of-type:border-b-0"
          >
            {item.Icon}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
