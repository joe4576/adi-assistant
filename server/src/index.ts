import { createContext, publicProcedure, router } from "./trpc";
import { z } from "zod";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const appRouter = router({
  userList: publicProcedure.query(async () => {
    return users;
  }),
  userById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return users.find((user) => user.id === input);
  }),
  createUser: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    users.push(input);
    return input;
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

app.listen(4000, () => {
  console.log(`Server started on http://localhost:${port}`);
});
