"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { ApiOutputs } from "@/server/api/types";
import { socials } from "@/data/socials";
import { api } from "@/utils/api";

type Social = ApiOutputs["profile"]["get"]["socials"][number];

export const ProfileContext = createContext({
  userSocials: [] as Social[],
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
    },
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
  isSaving: false,
});

type ProfileProviderProps = PropsWithChildren & {
  initialSocials: Social[];
  initialEmail: string;
  initialFirstName: string;
  initialLastName: string;
};

export const ProfileProvider: FC<ProfileProviderProps> = ({
  children,
  initialSocials,
  initialEmail,
  initialFirstName,
  initialLastName,
}) => {
  const { mutate, isLoading } = api.profile.update.useMutation({
    onSuccess: () => {
      toast.success("Profile updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [image, setImage] = useState("");

  const [userSocials, setUserSocials] = useState(initialSocials);

  const availableSocials = useMemo(
    () =>
      socials.filter(
        (social) =>
          !userSocials.find((s) => s.providerId === social.providerId),
      ),
    [userSocials],
  );

  const add = useCallback(() => {
    if (userSocials[0]?.providerId === "") return;
    setUserSocials((prev) => [{ providerId: "", url: "" }, ...prev]);
  }, [userSocials]);

  const swap = useCallback(
    (firstId: string, secondId: string) => {
      const firstIndex = userSocials.findIndex((s) => s.providerId === firstId);
      const secondIndex = userSocials.findIndex(
        (s) => s.providerId === secondId,
      );
      if (firstIndex === -1 || secondIndex === -1) return;
      const newSocials = [...userSocials];
      newSocials[firstIndex] = userSocials[secondIndex]!;
      newSocials[secondIndex] = userSocials[firstIndex]!;
      setUserSocials(newSocials);
    },
    [userSocials],
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
      },
    ) => {
      const social = userSocials.find((s) => s.providerId === id);
      if (!social) return;
      if (providerId && !userSocials.find((s) => s.providerId === providerId)) {
        social.providerId = providerId;
      }
      if (url) {
        social.url = url;
      }
      setUserSocials((prev) =>
        prev.map((s) => {
          if (s.providerId === id) {
            return social;
          }
          return s;
        }),
      );
    },
    [userSocials],
  );

  return (
    <ProfileContext.Provider
      value={{
        userSocials,
        add,
        remove: (id: string) =>
          setUserSocials((prev) => prev.filter((s) => s.providerId !== id)),
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
        isSaving: isLoading,
        save: () =>
          mutate({
            socials: userSocials.map((social) => ({
              providerId: social.providerId,
              url: social.url,
            })),
            email,
            firstName,
            lastName,
          }),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
