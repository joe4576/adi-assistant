import { ReactNode } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const WrapLoading = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};
