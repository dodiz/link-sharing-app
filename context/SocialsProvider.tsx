"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ApiOutputs } from "@/server/api/types";
import { socials } from "@/data/socials";

export const SocialsContext = createContext({
  userSocials: [] as {
    providerId: string;
    url: string;
    id: string;
  }[],
  availableSocials: [] as typeof socials,
  add: () => {},
  remove: (id: string) => {},
  swap: (firstId: string, secondId: string) => {},
  update: (
    id: string,
    {
      providerId,
      url,
    }: {
      providerId?: string;
      url?: string;
    }
  ) => {},
});

type SocialProviderProps = PropsWithChildren & {
  initialSocials: ApiOutputs["socials"]["getAll"];
};

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const SocialsProvider: FC<SocialProviderProps> = ({
  children,
  initialSocials,
}) => {
  const [userSocials, setUserSocials] = useState(
    initialSocials.map((s) => ({
      ...s,
      id: uuid(),
    }))
  );

  const availableSocials = useMemo(
    () =>
      socials.filter(
        (social) => !userSocials.find((s) => s.providerId === social.providerId)
      ),
    [userSocials]
  );

  const add = useCallback(() => {
    setUserSocials((prev) => [
      { providerId: "", url: "", id: uuid() },
      ...prev,
    ]);
  }, []);

  const remove = useCallback(
    (id: string) => setUserSocials((prev) => prev.filter((s) => s.id !== id)),
    []
  );

  const swap = useCallback(
    (firstId: string, secondId: string) => {
      const firstIndex = userSocials.findIndex((s) => s.id === firstId);
      const secondIndex = userSocials.findIndex((s) => s.id === secondId);
      if (firstIndex === -1 || secondIndex === -1) return;
      const newSocials = [...userSocials];
      newSocials[firstIndex] = userSocials[secondIndex]!;
      newSocials[secondIndex] = userSocials[firstIndex]!;
      setUserSocials(newSocials);
    },
    [userSocials]
  );

  const update = useCallback(
    (
      id: string,
      {
        providerId,
        url,
      }: {
        providerId?: string;
        url?: string;
      }
    ) => {
      const social = userSocials.find((s) => s.id === id);
      if (!social) return;
      if (providerId && !userSocials.find((s) => s.providerId === providerId)) {
        social.providerId = providerId;
      }
      if (url) {
        social.url = url;
      }
      setUserSocials((prev) =>
        prev.map((s) => {
          if (s.id === id) {
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
        add,
        remove,
        update,
        swap,
        availableSocials,
      }}
    >
      {children}
    </SocialsContext.Provider>
  );
};
