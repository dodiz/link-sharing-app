import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

/**
 * Merges tailwind classes
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
