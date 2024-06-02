import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@server/index";
import { httpBatchLink } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";

const api = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

export const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_BASE_URL}/trpc`,
      async headers() {
        return {
          Authorization: "Bearer joe",
        };
      },
    }),
  ],
});

export default api;
