import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { createClient } from "@supabase/supabase-js";

export const createContext = (opts: CreateExpressContextOptions) => {
  const db = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  console.log(process.env.SUPABASE_URL);
  console.log(process.env.NODE_ENV);

  return {
    db,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
