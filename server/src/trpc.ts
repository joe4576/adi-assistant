import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { getAuth } from "firebase-admin/auth";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const bearerToken = req.headers.authorization?.split(" ")[1] ?? "";

  let uid: string | null = null;

  try {
    const decodedIdToken = await getAuth().verifyIdToken(bearerToken);
    uid = decodedIdToken.uid;
  } catch (e) {
    console.error(`Failed to validate token ${bearerToken}`, e);
  }

  return {
    req,
    res,
    uid,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.uid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return opts.next({
    ctx: {
      uid: opts.ctx.uid,
    },
  });
});
