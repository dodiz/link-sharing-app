"use client";

import { type RefObject, useEffect, useRef, useCallback } from "react";

export const useClickOutside = (
  callback: () => void,
): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [callback],
  );

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [callback, handleClickOutside, handleEscape]);

  return ref;
};
