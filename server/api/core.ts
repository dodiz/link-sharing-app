import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import superjson from "superjson";
import { getServerAuthSession } from "@/server/auth";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();
  return {
    /**
     * @todo add context db
     */
    session: {
      user: session?.user ?? null,
    },
    ...opts,
  };
};

/**
 * Context
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * API Routers and procedures
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (
    !ctx.session ||
    !ctx.session.user ||
    !ctx.session.user.email ||
    !ctx.session.user.name ||
    !ctx.session.user.image
  ) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: {
          email: ctx.session.user.email,
          name: ctx.session.user.name,
          image: ctx.session.user.image,
        },
      },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
