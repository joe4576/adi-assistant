import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import firebaseServiceAccountKey from "../firebase-service-account-key.json";

initializeApp({
  // @ts-ignore
  credential: credential.cert(firebaseServiceAccountKey),
});
