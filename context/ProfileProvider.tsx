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
import { api } from "@/utils/api";

type Social = ApiOutputs["profile"]["getInfo"]["socials"][number];

export const ProfileContext = createContext({
  userSocials: [] as (Social & {
    id: string;
  })[],
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
  email: "",
  setEmail: (email: string) => {},
  firstName: "",
  setFirstName: (firstName: string) => {},
  lastName: "",
  setLastName: (lastName: string) => {},
  image: "",
  setImage: (image: string) => {},
  save: () => {},
});

type ProfileProviderProps = PropsWithChildren & {
  initialSocials: Social[];
  initialEmail: string;
  initialFirstName: string;
  initialLastName: string;
};

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const ProfileProvider: FC<ProfileProviderProps> = ({
  children,
  initialSocials,
  initialEmail,
  initialFirstName,
  initialLastName,
}) => {
  const { mutate } = api.profile.update.useMutation({
    onSuccess: () => {
      alert("Saved!");
    },
  });
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [image, setImage] = useState("");

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

  const save = useCallback(() => {
    mutate({
      socials: userSocials.map((social) => ({
        providerId: social.providerId,
        url: social.url,
      })),
      email,
      firstName,
      lastName,
    });
  }, [firstName, lastName, email, userSocials]);

  return (
    <ProfileContext.Provider
      value={{
        userSocials,
        add,
        remove,
        update,
        swap,
        availableSocials,
        email,
        setEmail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        image,
        setImage,
        save,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
