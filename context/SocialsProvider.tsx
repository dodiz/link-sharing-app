"use client";
import { FC, PropsWithChildren, createContext } from "react";
import { api } from "@/utils/api";
import { RouterOutputs } from "@/server/api/root";

export const SocialsContext = createContext({
  socials: [] as RouterOutputs["socials"]["getAll"],
});

type SocialProviderProps = PropsWithChildren & {
  initialSocials: RouterOutputs["socials"]["getAll"];
};

export const SocialsProvider: FC<SocialProviderProps> = ({
  children,
  initialSocials,
}) => {
  const { data } = api.socials.getAll.useQuery(undefined, {
    initialData: initialSocials,
  });

  return (
    <SocialsContext.Provider
      value={{
        socials: data ?? [],
      }}
    >
      {children}
    </SocialsContext.Provider>
  );
};
