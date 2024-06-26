"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { SaveIcon } from "@/assets/SaveIcon";
import { ApiOutputs } from "@/server/api/types";
import { socials } from "@/data/socials";
import { useUpload } from "@/hooks/useUpload";
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
  slug: "",
  email: "",
  setEmail: (email: string) => {},
  firstName: "",
  setFirstName: (firstName: string) => {},
  lastName: "",
  setLastName: (lastName: string) => {},
  image: "",
  setImage: (image: string) => {},
  setFileImage: (fileImage: File | null) => {},
  save: () => {},
  isSaving: false,
});

type ProfileProviderProps = PropsWithChildren & {
  initialSlug: string;
  initialSocials: Social[];
  initialEmail: string;
  initialFirstName: string;
  initialLastName: string;
  initialImage: string;
};

export const ProfileProvider: FC<ProfileProviderProps> = ({
  children,
  initialSocials,
  initialEmail,
  initialFirstName,
  initialLastName,
  initialImage,
  initialSlug,
}) => {
  const [slug, setSlug] = useState(initialSlug);
  const { mutate: save, isLoading } = api.profile.update.useMutation({
    onSuccess: (data) => {
      setSlug(data[0]?.slug || initialSlug);
      toast(
        <div className="flex items-center gap-2">
          <SaveIcon width={20} height={20} />
          Your changes have been successfully saved!
        </div>,
      );
    },
    onError: (error) => toast.error(error.message),
  });
  const { startUpload, isUploading } = useUpload("imageUploader", {
    onUploadError: (error: Error) => toast.error(`ERROR! ${error.message}`),
  });
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [image, setImage] = useState(initialImage);
  const [fileImage, setFileImage] = useState<File | null>(null);

  useEffect(() => {
    if (fileImage) {
      setImage(URL.createObjectURL(fileImage));
    }
  }, [fileImage]);

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

  const handleSave = useCallback(async () => {
    let userImage = image;
    if (!!fileImage) {
      const response = await startUpload([fileImage]);
      userImage = response?.[0]?.url || image;
    }
    save({
      socials: userSocials,
      email,
      firstName,
      lastName,
      image: userImage,
    });
  }, [
    image,
    startUpload,
    userSocials,
    email,
    firstName,
    lastName,
    save,
    fileImage,
  ]);

  return (
    <ProfileContext.Provider
      value={{
        slug,
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
        setFileImage,
        isSaving: isLoading || isUploading,
        save: handleSave,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
