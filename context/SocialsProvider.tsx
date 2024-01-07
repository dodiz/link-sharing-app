"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { RouterOutputs } from "@/server/api/root";
import { socials } from "@/data/socials";

export const SocialsContext = createContext({
  userSocials: [] as {
    id: string;
    url: string;
  }[],
  availableSocials: [] as typeof socials,
  addSocial: () => {},
  removeSocial: (index: number) => {},
  updateSocial: (
    index: number,
    {
      id,
      url,
    }: {
      id?: string;
      url?: string;
    }
  ) => {},
});

type SocialProviderProps = PropsWithChildren & {
  initialSocials: RouterOutputs["socials"]["getAll"];
};

export const SocialsProvider: FC<SocialProviderProps> = ({
  children,
  initialSocials,
}) => {
  const [userSocials, setUserSocials] = useState(initialSocials);

  const availableSocials = useMemo(
    () =>
      socials.filter((social) => !userSocials.find((s) => s.id === social.id)),
    [userSocials]
  );

  const addSocial = useCallback(() => {
    setUserSocials((prev) => [{ id: "", url: "" }, ...prev]);
  }, []);

  const removeSocial = useCallback(
    (index: number) => setUserSocials((prev) => prev.splice(index, 1)),
    []
  );

  const updateSocial = useCallback(
    (
      index: number,
      {
        id,
        url,
      }: {
        id?: string;
        url?: string;
      }
    ) => {
      const newSocials = [...userSocials];
      const social = newSocials[index];
      if (!social) return;
      if (id) {
        social.id = id;
      }
      if (url) {
        social.url = url;
      }
      setUserSocials((prev) =>
        prev.map((s, i) => {
          if (i === index) {
            return social;
          }
          return s;
        })
      );
    },
    [userSocials]
  );

  return (
    <SocialsContext.Provider
      value={{
        userSocials,
        addSocial,
        removeSocial,
        updateSocial,
        availableSocials,
      }}
    >
      {children}
    </SocialsContext.Provider>
  );
};
