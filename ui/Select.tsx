"use client";

import { ReactNode, FC } from "react";
import {
  Group,
  Value,
  Item,
  Root,
  Trigger,
  Icon,
  Content,
  Portal,
  ScrollUpButton,
  ScrollDownButton,
  Viewport,
} from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ArrowDownIcon } from "@/assets/ArrowDownIcon";
import { Typography } from "./Typography";

type SelectProps = {
  options: {
    value: string;
    label: ReactNode;
  }[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: ReactNode;
};
export const Select: FC<SelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
  label,
}) => {
  return (
    <Root value={value} onValueChange={onChange}>
      <Typography variant="body-s">{label}</Typography>
      <Trigger className="border group flex w-full items-center justify-between rounded-sm border-slate-200 bg-white px-4 py-3 font-semibold ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:border-primary-300 data-[state=open]:shadow-accent [&>span]:line-clamp-1">
        <Value placeholder={placeholder}>
          {options.find((option) => option.value === value)?.label}
        </Value>
        <Icon>
          <ArrowDownIcon className="transition-all group-data-[state=open]:rotate-180" />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          className="border shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border-slate-200 bg-white px-4 text-slate-950 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
          position="popper"
        >
          <ScrollUpButton className="flex cursor-default items-center justify-center py-1">
            <ChevronUp className="h-4 w-4" />
          </ScrollUpButton>
          <Viewport className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] p-1">
            <Group>
              {options.map((option) => (
                <Item
                  key={option.value}
                  className="border-b last:border-b-0 relative flex w-full cursor-pointer select-none items-center gap-3 border-secondary-300 py-3 outline-none focus:bg-secondary-50 focus:text-primary-300  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  value={option.value}
                >
                  {option.label}
                </Item>
              ))}
            </Group>
          </Viewport>
          <ScrollDownButton className="flex cursor-default items-center justify-center py-1">
            <ChevronDown className="h-4 w-4" />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  );
};
