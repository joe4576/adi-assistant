import { createContext } from "react";
import { User } from "firebase/auth";

export const FirebaseUserContext = createContext<User | null>(null);
