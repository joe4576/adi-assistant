import { createContext, protectedProcedure, router } from "./trpc";
import { z } from "zod";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";
import "@/initaliseFirebase";
import { userSchema, UserService } from "@/services/user.service";

dotenv.config();

const appRouter = router({
  userList: protectedProcedure.query(async ({ ctx }) => {
    const userService = new UserService(ctx);

    return await userService.getAllUsers();
  }),
  userById: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const userService = new UserService(ctx);
      return await userService.getUserById(input);
    }),
  createUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ input }) => {
      // users.push(input);
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
