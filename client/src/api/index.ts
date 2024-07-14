import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@server/index";
import { httpBatchLink } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";

const api = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

export const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
      // You can pass any HTTP headers you wish here
      async headers() {
        const auth = getAuth();
        const token = await auth.currentUser?.getIdToken(true);

        return {
          Authorization: `Bearer ${token}`,
        };
      },
    }),
  ],
});

export default api;
