import { createContext, publicProcedure, router } from "./trpc";
import { z } from "zod";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";

let envPath = "./.env";

if (process.env.NODE_ENV === "development") {
  envPath += ".development";
}

dotenv.config({
  path: envPath,
});

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

const appRouter = router({
  getAllEmployees: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.from("employees").select();
    return result.data;
  }),
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
