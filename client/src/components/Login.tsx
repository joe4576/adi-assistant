import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext } from "react";
import { FirebaseUserContext } from "@client/context/firebaseUserContext";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";

export const Login = () => {
  const user = useContext(FirebaseUserContext);
  const { replace } = useHistory();

  // useEffect(() => {
  //   if (user) {
  //     replace("/home");
  //   }
  // }, [user]);

  const login = async () => {
    const result = await signInWithEmailAndPassword(
      getAuth(),
      "joe@test.com",
      "password",
    );
    console.log("signed in", result);

    replace("/home");
  };

  //
  // const user = useContext(FirebaseUserContext);
  // // const printIdToken = async () => {
  // //   if (!user) return;
  // //
  // //   const token = await user.getIdToken(true);
  // //   console.log(token);
  // // };
  //
  // console.log("user", user);
  // if (user) {
  //   return <Redirect to="/tab1" />;
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <IonButton onClick={login}>Log IN</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
