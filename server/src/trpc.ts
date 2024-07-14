import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { Firestore } from "firebase-admin/firestore";
import {
  instructorSchema,
  InstructorService,
} from "@/services/instructor.service";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const bearerToken = req.headers.authorization?.split(" ")[1] ?? "";

  let uid: string | null = null;
  let db: Firestore | null = null;
  const instructorId: string | null = null;

  try {
    const decodedIdToken = await getAuth().verifyIdToken(bearerToken);
    uid = decodedIdToken.uid;
    db = getFirestore();
  } catch (e) {
    console.error(`Failed to validate token ${bearerToken}`, e);
  }

  return {
    req,
    res,
    uid,
    db,
    instructorId,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.uid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  if (!ctx.db) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  return next({
    ctx: {
      uid: ctx.uid,
      db: ctx.db,
    },
  });
});

export const instructorProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const instructorService = new InstructorService(ctx);

    const instructor = await instructorService.getInstructorById(ctx.uid);

    if (!instructor) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not logged in as an instructor",
      });
    }

    return next({
      ctx: {
        ...ctx,
        instructorId: instructor.id,
      },
    });
  },
);
