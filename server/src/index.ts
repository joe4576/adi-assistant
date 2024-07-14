import { createContext, router } from "@server/trpc";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";
import "@server/initaliseFirebase";
import { studentRouter } from "@server/routers/student.router";

dotenv.config();

const appRouter = router({
  student: studentRouter,
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
