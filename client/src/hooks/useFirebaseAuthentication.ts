import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export const useFirebaseAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, isLoading };
};
