import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/server/api/types";

export const api = createTRPCReact<AppRouter>();
