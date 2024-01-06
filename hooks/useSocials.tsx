import { useContext } from "react";
import { SocialsContext } from "@/context/SocialsProvider";

export const useSocials = () => useContext(SocialsContext);
