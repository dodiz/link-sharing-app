import { ComponentProps, FC } from "react";
import { CodeWarsIcon } from "@/assets/CodeWarsIcon";
import { DevToIcon } from "@/assets/DevtoIcon";
import { FacebookIcon } from "@/assets/FacebookIcon";
import { FreeCodeCampIcon } from "@/assets/FreeCodeCampIcon";
import { FrontendMentorIcon } from "@/assets/FrontendMentorIcon";
import { GithubIcon } from "@/assets/GithubIcon";
import { GitlabIcon } from "@/assets/GitlabIcon";
import { HashnodeIcon } from "@/assets/HashnodeIcon";
import { LinkedinIcon } from "@/assets/LinkedinIcon";
import { StackOverflowIcon } from "@/assets/StackOverflowIcon";
import { TwitchIcon } from "@/assets/TwitchIcon";
import { TwitterIcon } from "@/assets/TwitterIcon";
import { YoutubeIcon } from "@/assets/YoutubeIcon";

export const socials: {
  Icon: FC<ComponentProps<"svg">>;
  label: string;
  id: string;
  bgColor: string;
  textColor?: string;
}[] = [
  {
    Icon: GithubIcon,
    id: "github",
    label: "Github",
    bgColor: "#1A1A1A",
  },
  {
    Icon: FrontendMentorIcon,
    id: "frontend_mentor",
    label: "Frontend Mentor",
    bgColor: "#ffffff",
    textColor: "#333333",
  },
  {
    Icon: TwitterIcon,
    id: "twitter",
    label: "Twitter",
    bgColor: "#43B7E9",
  },
  {
    Icon: LinkedinIcon,
    id: "linkedin",
    label: "Linkedin",
    bgColor: "#2D68FF",
  },
  {
    Icon: YoutubeIcon,
    id: "youtube",
    label: "Youtube",
    bgColor: "#EE3939",
  },
  {
    Icon: FacebookIcon,
    id: "facebook",
    label: "Facebook",
    bgColor: "#2442AC",
  },
  {
    Icon: TwitchIcon,
    id: "twitch",
    label: "Twitch",
    bgColor: "#EE3FC8",
  },
  {
    Icon: DevToIcon,
    id: "devto",
    label: "Dev.to",
    bgColor: "#333333",
  },
  {
    Icon: CodeWarsIcon,
    id: "codewars",
    label: "CodeWars",
    bgColor: "#8A1A50",
  },
  {
    Icon: FreeCodeCampIcon,
    id: "freecodecamp",
    label: "freeCodeCamp",
    bgColor: "#302267",
  },
  {
    Icon: GitlabIcon,
    id: "gitlab",
    label: "Gitlab",
    bgColor: "#EB4925",
  },
  {
    Icon: HashnodeIcon,
    id: "hashnode",
    label: "Hashnode",
    bgColor: "#0330D1",
  },
  {
    Icon: StackOverflowIcon,
    id: "stackoverflow",
    label: "Stack Overflow",
    bgColor: "#EC7100",
  },
];
